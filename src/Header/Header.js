import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

export default function Header(props) {
    const { filterByTag } = props;
    return (
        <header className="App__header">
            <h1>Candy cotton candy sesame snaps biscuit</h1>
            <div className="message">
                Candy cotton candy sesame <button onClick={filterByTag('Design')} className="tag">#Design</button> 
                <button onClick={filterByTag('HR')} className="tag">#HR</button> biscuit dessert topping halvah 
                marshmallow gummies. Pie toffee dragée chocolate toffee biscuit. Icing chocolate cake ice cream 
                jelly beans chocolate cake soufflé candy.
            </div>
        </header>
    );
}
Header.propTypes = {filterByTag: PropTypes.string,};
Header.defaultProps = {filterByTag: '',};
