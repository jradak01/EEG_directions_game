import React from 'react';
import { Tabs,Tab } from 'react-bootstrap';
import CollectElement from './CollectElement';

const CollectData = () => {
    return (
        <div>
            <Tabs
                defaultActiveKey="sides"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{backgroundColor: 'whitesmoke'}}
            >
                <Tab eventKey="sides" title="Sides">
                    <CollectElement />
                </Tab>
                <Tab eventKey="items" title="Items" disabled>
                    <CollectElement />
                </Tab>
            </Tabs>
        </div>
    );
}

export default CollectData;