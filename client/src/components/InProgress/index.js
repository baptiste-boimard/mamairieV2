import { Message } from 'semantic-ui-react';

import './style.scss';

function InProgress() {
  return (
    <Message
      className="inprogress-message"
      icon="cogs"
      header="Service bientôt disponible"
      content="Nous travaillons dur pour vous présenter cette section"
    />
  );
}

export default InProgress;
