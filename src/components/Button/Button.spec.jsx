import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  //Agrupa ps testes
  /* Deveria rendereizar o botão com o texto "Load More" */
  it('should render the button with the text "Load More"', () => {
    //Inicia um teste
    render(<Button text="Load More" />); //Renderiza um elemento

    expect.assertions(1); //Para testes assíncronos, espera pelo menos um expect

    const button = screen.getByRole('button', { name: /load more/i }); //Captura um elemento renderizado pelo tipo e texto
    expect(button).toBeInTheDocument();
  });

  /* Deveria chamar a função quando o botão for clicado */
  it('should call function on button click', () => {
    //Inicia um teste
    const fn = jest.fn(); //Cria uma Mock function, uma simulação de função

    render(<Button text="Load More" onClick={fn} />); //Renderiza um elemento
    const button = screen.getByRole('button', { name: /load more/i }); //Captura um elemento renderizado pelo tipo e texto

    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  /* Deveria estar desativado quando disabled == true*/
  it('should disabled when disabled is true', () => {
    //Inicia um teste
    render(<Button text="Load More" disabled={true} />); //Renderiza um elemento
    const button = screen.getByRole('button', { name: /load more/i }); //Captura um elemento renderizado pelo tipo e texto

    userEvent.click(button); /* Simula um click no button */
    expect(button).toBeDisabled(); /* Espera que o button esteja desativado*/
  });

  /* Deveria estar ativado quando disabled == false*/
  it('should enabled when disabled is false', () => {
    //Inicia um teste
    render(<Button text="Load More" disabled={false} />); //Renderiza um elemento
    const button = screen.getByRole('button', { name: /load more/i }); //Captura um elemento renderizado pelo tipo e texto

    userEvent.click(button); /* Simula um click no button */
    expect(button).toBeEnabled(); /* Espera que o button esteja desativado*/
  });
});
