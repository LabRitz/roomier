import React, { Component } from 'react';

const CreatePost = (props) => {

    return (
        <div className='createPostRoute'>
            <h2>Home Facts</h2>
            <span>Adress</span>
            <input type={'text'} id="street1" placeholder='Street address or P.O. Box'></input>
            <input type={'text'} id="street2" placeholder='Apt, suite, unit, building, floor, etc'></input>
            {/* <button type='submit' id='submit' onClick={handleLogin}>Login</button> */}
            {/* <Link to='/signup'>Sign up</Link> */}
        </div>
    )
}

export default CreatePost