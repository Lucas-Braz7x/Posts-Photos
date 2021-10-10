import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  /* Cria um mini servidor para olhar as requisições */
  rest.get('*https://jsonplaceholder.typicode.com/posts*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          img: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          img: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          img: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          img: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title5',
          body: 'body5',
          img: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title6',
          body: 'body6',
          img: 'img6.jpg',
        },
        {
          userId: 7,
          id: 7,
          title: 'title7',
          body: 'body7',
          img: 'img7.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  /* Liga o servidor */
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  /* Desliga o servidor */
  afterAll(() => {
    server.close();
  });
  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existe post com essa informação');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText('Digite o que você procura');
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(6);

    const button = screen.getByRole('button', { name: 'Load More Posts' });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existe post com essa informação');

    expect.assertions(13);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText('Digite o que você procura');
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title7' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1'); //Digita title1 no input
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title4' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pesquisar: title1' })).toBeInTheDocument();

    userEvent.clear(search); //Limpa a tela
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();

    userEvent.type(search, 'blabla'); //Limpa a tela
    expect(screen.getByText('Não existe post com essa informação')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existe post com essa informação');

    //expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    const button = screen.getByRole('button', { name: 'Load More Posts' });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title7' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
