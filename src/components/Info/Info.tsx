import React from 'react';

const Info = () => {
  return (
    <div className='info'>
      <h2 className='info__h2'>Sobre la App</h2>
      <p className='info__p'>
        Es una pokedex donde podras buscar pokemons y saber sus detalles con la
        intuitiva <span className='info__span'>POKEDEX</span> real podras
        filtrar segun el tipo de pokemon que quieras ver y en la parte de arriba
        veras una barra de busqueda ahi pondras el nombre de tu pokemon y podras
        entrar rapidamente a ver sus detalles tambien puedes jugar al juego de
        la memorizacion y adivina cual es?. Si no sabes nada de los pokemons te
        daremos ayuda para que no tengas que salir de la pagina en busca de
        informacion.
      </p>
    </div>
  );
};

export default Info;
