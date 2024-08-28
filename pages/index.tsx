import { generateClient } from "aws-amplify/data";
import { createAIHooks } from '@aws-amplify/ui-react-ai';
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>({ authMode: 'userPool' });
const { useAIConversation, useAIGeneration } = createAIHooks(client);

export default function Page() {
  const [
    {
      data: { messages },
    },
    sendMessage,
  ] = useAIConversation('pirateChat');

  const handleSubmit = (e) => {
    e.preventDefault();
    // you can call sendMessage with aiContext:
    sendMessage({
      content: [{
        text: 'hello'
      }],
    });
  }


  return (
    <div>
      {messages.map(message => (
        <div>{JSON.stringify(message)}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">send</button>
      </form>
    </div>
  )
}