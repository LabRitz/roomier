import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { RadialGradient } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import genRandomNormalPoints from '@visx/mock-data/lib/generators/genRandomNormalPoints';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';

// const points = genRandomNormalPoints(600, /* seed= */ 0.5).filter((_, i) => i < 600);

const x = (d) => {
  return d.description.sqFt;
}
const y = (d) => {
  return d.rent;
}

let tooltipTimeout;

export default withTooltip(
  ({ posts, width, height, showControls = false, hideTooltip, showTooltip, tooltipOpen, tooltipData, tooltipLeft, tooltipTop }) => {        
    if (width < 10) return null;
    const [showVoronoi, setShowVoronoi] = useState(showControls);
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