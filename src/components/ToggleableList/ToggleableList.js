import React, { Fragment, useState } from 'react';

const Item = ({ item, onClickHandler, isActive }) => {
    return (
        <div>
            <item.Trigger onClick={onClickHandler} />
            {isActive && item.children}
        </div>
    );
};

function ToggleableList({ items }) {
    const [selectItem, setSelectedItem] = useState();
    return (
        <Fragment>
            {items.map(item => (
                <Item key={item.id} item={item} onClickHandler={setSelectedItem} isActive={selectItem === item.id} />
            ))}
        </Fragment>
    );
}

export default ToggleableList;
