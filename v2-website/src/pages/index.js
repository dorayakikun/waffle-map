import React from 'react';
import Layout from '@theme/Layout';

function Index() {
    return (
        <Layout title="Hello">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '20px',
                }}>
                <p>
                    Waffle-Map
                </p>
            </div>
        </Layout>
    );
}

export default Index;