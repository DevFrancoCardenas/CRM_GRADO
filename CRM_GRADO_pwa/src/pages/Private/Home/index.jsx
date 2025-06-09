import { IonImg } from '@ionic/react';
import Page from '@/components/Page';
import "./Home.css";

export default function Dashboard() {
    return (
        <Page>
            <div className='px-8 py-8'>
                <IonImg src='/logo.png' />
            </div>
        </Page>
    );
};
