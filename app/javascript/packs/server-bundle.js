import ReactOnRails from 'react-on-rails';

import Chat from '../bundles/Chat/components/ChatServer';

// This is how react_on_rails can see the Chat in the browser.
ReactOnRails.register({
  Chat,
});
