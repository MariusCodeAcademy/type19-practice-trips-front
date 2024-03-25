//

import Button from '../components/UI/Button';

export default function HomePage() {
  return (
    <div>
      <div className='container'>
        <h1 className='display-2'>HomePage</h1>
        <p>Welcome to our HomePage</p>
        <Button>Just button</Button>
        <Button secondary>Secondary button</Button>
        <Button outline>Outline button</Button>
        <Button info>Info button</Button>
      </div>
    </div>
  );
}
