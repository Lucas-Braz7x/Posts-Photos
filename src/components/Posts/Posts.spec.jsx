import { render, screen } from '@testing-library/react';
import {Posts} from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'titulo 1',
      body: 'body 1',
      cover: 'img/img1.png'
    },
    {
      id: 1,
      title: 'titulo 2',
      body: 'body 2',
      cover: 'img/img2.png'
    },
    {
      id: 3,
      title: 'titulo 3',
      body: 'body 3',
      cover: 'img/img3.png'
    }
  ]
} 

describe('<Posts />', () =>{
  it('should render posts', () =>{
    render(<Posts posts={props.posts} />);

    expect(screen.getAllByRole('heading', {name: /titulo/}))
    .toHaveLength(3);
    expect(screen.getAllByRole('img', {name: /titulo/i}))
    .toHaveLength(3);
    expect(screen.getAllByText(/body/i))
    .toHaveLength(3);
    expect(screen.getByRole('img', {name: /titulo 3/i}))
    .toHaveAttribute('src', 'img/img3.png');
  });
  it('should match snapshot', () =>{
    const {container} = render(<Posts posts={props.posts} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});