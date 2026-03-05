import React from 'react';

// Define the structure for page props if necessary
interface vigilanciaProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const NextPage = () => {
  return (
    <main>
      <h1>Página Nueva</h1>
    </main>
  );
};

export default NextPage;
