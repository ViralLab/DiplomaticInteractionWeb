import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

const WorkInProgress = () => (
  <Segment style={{ borderRadius: '8px', padding: '24px', textAlign: 'center' }} placeholder>
    <Header icon>
      <Icon name='wrench' />
      Work in Progress
    </Header>
    <p>This page is currently under construction. Please check back later for updates!</p>
  </Segment>
);

export default WorkInProgress;