import Link from "next/link";

async function getCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
  return response;
}

function getTableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="mx-auto px-6 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
      </tr>
    </thead>
  );
}

function showErrorMessage() {
  return (
    <h3 className="text-center text-4xl font-medium text-gray-700">
      Oops! There is something{" "}
      <span className="font-light text-gray-500">wrong.</span>
    </h3>
  );
}

export default async function Home() {
  const data = await getCharacters();
  return (
    <main className=" justify-between p-6">
      <h1 className="text-center text-4xl font-medium text-gray-700">
        Character <span className="font-light text-gray-500">List</span>
      </h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {data.error ? showErrorMessage() : getTableHeader()}

          {data.results &&
            data.results.map((character: any, i: number) => {
              return (
                <tbody key={character.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="rounded-full"
                        src={character.image}
                        height="50px"
                        width="50px"
                      ></img>
                    </th>
                    <td className="px-6 py-4">
                      <Link href={`/character/${character.id}`}>
                        {character.name}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </main>
  );
}
