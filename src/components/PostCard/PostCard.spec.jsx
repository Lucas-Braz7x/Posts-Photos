import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard post={props} />);

    expect(screen.getByRole('img', { name: /Título 1/i })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: 'Título 1' })).toBeInTheDocument();
    expect(screen.getByText('Body 1')).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard post={props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
