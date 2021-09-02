import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';
/*
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
 */
describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    const input = screen.getByPlaceholderText(/Digite o que você procura/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'um valor'} />);

    const input = screen.getByPlaceholderText(/Digite o que você procura/i);
    const value = 'o valor';

    userEvent.type(input, value); /* Verifica se o valor do input é igual ao valor esperado */
    expect(fn).toHaveBeenCalledTimes(value.length); /* Verifica se fn foi chamado de acordo com o tamanho de value */
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue={''} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
