import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { RadialGradient } from '@visx/gradient';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';
import { Axis, Orientation, SharedAxisProps, AxisScale } from '@visx/axis';
import { AnimatedAxis, AnimatedGridRows, AnimatedGridColumns } from '@visx/react-spring';
import { scaleLinear, ScaleInput, coerceNumber } from '@visx/scale';

import AreaClosed from '@visx/shape/lib/shapes/AreaClosed';
import { curveMonotoneX } from '@visx/curve';

const x = (d) => {
  return d.description.sqFt;
}
const y = (d) => {
  return d.rent;
}

const backgroundColor = '#da7cff';
const axisColor = '#fff';
const tickLabelColor = '#fff';
const labelColor = '#340098';
const gridColor = '#6e0fca';

const tickLabelProps = () =>
  ({
    fill: tickLabelColor,
    fontSize: 12,
    fontFamily: 'sans-serif',
    textAnchor: 'middle',
  });

const getMinMax = (vals) => {
  const numericVals = vals.map(coerceNumber);
  return [Math.min(...numericVals), Math.max(...numericVals)];
};

const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

let tooltipTimeout;

export default withTooltip(
  ({ posts, width, height, showControls = false, hideTooltip, showTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop }) => {        
    if (width < 10) return null;
    const [showVoronoi, setShowVoronoi] = useState(showControls);
    const [animationTrajectory, setAnimationTrajectory] = useState('min');
    const svgRef = useRef(null);

    const maxPrice = useMemo(() => {
      return posts.reduce((max, post) => Math.max(max, post.rent), 0)
    }, [posts])
    const maxSqft = useMemo(() => {
      return posts.reduce((max, post) => Math.max(max, post.description.sqFt), 0)
    }, [posts])

    const xScale = scaleLinear({
      domain: [0, maxSqft],
      range: [20, width-20],
      clamp: true,
    })
    
    const yScale = scaleLinear({
      domain: [0, maxPrice],
      range: [height-20, 20],
      clamp: true,
    })

    const AxisComponent = AnimatedAxis
    const GridRowsComponent = AnimatedGridRows
    const GridColumnsComponent = AnimatedGridColumns

    const axes = useMemo(() => {
      const linearValues = [0, 2, 4, 6, 8, 10]; 
      return [{
        scale: scaleLinear({
          domain: getMinMax(linearValues),
          range: [0, width],
        }),
        values: linearValues,
        tickFormat: (v, index, ticks) =>
          index === 0 ? 'first' : index === ticks[ticks.length - 1].index ? 'last' : `${v}`,
        label: 'linear',
      }];
    }, [width]);

    const scalePadding = 0;
    const scaleHeight = height / axes.length - scalePadding;

    const voronoiLayout = useMemo(() =>
      voronoi({
        x: (d) => xScale(x(d)) ?? 0,
        y: (d) => yScale(y(d)) ?? 0,
        width,
        height,
      })(posts), [width, height, xScale, yScale]);

    // event handlers
    const handleMouseMove = useCallback(
      (event) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        if (!svgRef.current) return;

        // find the nearest polygon to the current mouse position
        const point = localPoint(svgRef.current, event);
        if (!point) return;
        const neighborRadius = 100;
        const closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(x(closest.data)),
            tooltipTop: yScale(y(closest.data)),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip, voronoiLayout],
    );

    const handleMouseLeave = useCallback(() => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <div>
        <svg width={'100%'} height={'95%'} ref={svgRef}>
          <RadialGradient id='radial-gradiant' from="#55bdd5" to="#4f3681" r="80%" />
          {/** capture all mouse events with a rect */}
          <rect
            width={'100%'}
            height={'100%'}
            rx={14}
            fill="url(#radial-gradiant)"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseLeave}
          />
          <Group pointerEvents="none">
            {posts.map((post) => (
              <Circle
                key={post._id}
                className="dot"
                cx={xScale(x(post))}
                cy={yScale(y(post))}
                r={10}
                fill={tooltipData === post ? 'white' : '#f6c431'}
              />
            ))}
            {showVoronoi &&
              voronoiLayout
                .polygons()
                .map((polygon, i) => (
                  <VoronoiPolygon
                    key={`polygon-${i}`}
                    polygon={polygon}
                    fill="white"
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.2}
                    fillOpacity={tooltipData === polygon.data ? 0.5 : 0}
                  />
                ))}
          </Group>

          <g transform={`translate(${margin.left},${margin.top})`}>
            {axes.map(({ values, label, tickFormat }, i) => (
              <g key={`scale-${i}`} transform={`translate(0, ${i * (scaleHeight + scalePadding)})`}>
                <GridRowsComponent
                  // force remount when this changes to see the animation difference
                  key={`gridrows-${animationTrajectory}`}
                  scale={yScale}
                  stroke={gridColor}
                  width={width}
                  numTicks={15}
                  animationTrajectory={animationTrajectory}
                />
                <GridColumnsComponent
                  // force remount when this changes to see the animation difference
                  key={`gridcolumns-${animationTrajectory}`}
                  scale={xScale}
                  stroke={gridColor}
                  height={scaleHeight}
                  numTicks={10}
                  animationTrajectory={animationTrajectory}
                />
                <AreaClosed
                  data={values.map((x) => [
                    (xScale(x) ?? 0),
                    yScale(10),
                  ])}
                  yScale={yScale}
                  curve={curveMonotoneX}
                  fill={gridColor}
                  fillOpacity={0.2}
                />
                <AxisComponent
                  // force remount when this changes to see the animation difference
                  key={`axis-${animationTrajectory}`}
                  orientation={Orientation.bottom}
                  top={scaleHeight}
                  scale={xScale}
                  tickFormat={tickFormat}
                  stroke={axisColor}
                  tickStroke={axisColor}
                  tickLabelProps={tickLabelProps}
                  tickValues={values}
                  numTicks={undefined}
                  label={label}
                  labelProps={{
                    x: width + 30,
                    y: -10,
                    fill: labelColor,
                    fontSize: 18,
                    strokeWidth: 0,
                    stroke: '#fff',
                    paintOrder: 'stroke',
                    fontFamily: 'sans-serif',
                    textAnchor: 'start',
                  }}
                  animationTrajectory={animationTrajectory}
                />
              </g>
            ))}
          </g>

        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (
          <Tooltip left={tooltipLeft - 100} top={tooltipTop + 10}>
            <div>
              ${y(tooltipData)}/mo
            </div>
            <div>
              {x(tooltipData)} sqft
            </div>
          </Tooltip>
        )}
        {showControls && (
          <div>
            <label style={{ fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showVoronoi}
                onChange={() => setShowVoronoi(!showVoronoi)}
              />
              &nbsp;Show voronoi point map
            </label>
          </div>
        )}
      </div>
    );
  },
);