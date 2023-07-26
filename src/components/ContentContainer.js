import React from 'react';
import {Hero} from './Hero';
import {NewProducts} from "./NewProducts";
import { Advt } from './Advt';
import { OurExperties } from './OurExperties';
import { OurClients } from './OurClients';
import { Advt2 } from './Advt';
import { ClientBanner } from './OurClients';

export const ContentConatiner=(props)=>{
    return(
        <React.Fragment>
            <Hero specs={props.specs}/>
            <NewProducts isnew={true} title="New Products"/>
            <Advt/>
            <NewProducts isnew={false} title="Featured Products"/>
            <NewProducts isnew={false} title="Best Seller Products"/>
            <OurExperties/>
            <OurClients/>
            <Advt2/>
            <ClientBanner/>
        </React.Fragment>
    );
}