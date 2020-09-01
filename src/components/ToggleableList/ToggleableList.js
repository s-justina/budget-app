import React, { Fragment, useState, useEffect } from 'react';

const Item = ({ item, onClickHandler, isActive }) => {
    return (
        <div>
            <item.Trigger onClick={onClickHandler} />
            {isActive && item.children}
        </div>
    );
};

function ToggleableList({ items, clickRef }) {
    const [selectItem, setSelectedItem] = useState();
    useEffect(() => {
        clickRef.current = setSelectedItem;
    }, [clickRef, setSelectedItem]);

    return (
        <Fragment>
            {items.map(item => (
                <Item key={item.id} item={item} onClickHandler={setSelectedItem} isActive={selectItem === item.id} />
            ))}
        </Fragment>
    );
}

export default ToggleableList;
