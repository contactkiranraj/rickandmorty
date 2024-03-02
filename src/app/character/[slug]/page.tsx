import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  async function getCharacterDetails() {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${params.slug}`
    )
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  async function showCharacterDetails() {
    const details = await getCharacterDetails();
    console.log(details);
    if (!details.error) {
      return (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td>
                  <img
                    className="mx-auto rounded-full"
                    src={details.image}
                    height="250px"
                    width="250px"
                  ></img>
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="text-center px-6 py-4">
                  <p>Name : {details.name}</p>
                  <p>Status : {details.status}</p>
                  <p>Species : {details.species}</p>
                  <p>Type : {details.type}</p>
                  <p>Gender : {details.gender}</p>
                  <p>Origin : {details.origin.name}</p>
                  <p>Location : {details.location.name}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <h3 className="text-center text-4xl font-medium text-gray-700">
          Oops! There is something{" "}
          <span className="font-light text-gray-500">wrong.</span>
        </h3>
      );
    }
  }

  return (
    <main className=" justify-between p-6">
      <div className="flex items-start space-x-3 justify-between">
        <h1 className="text-center text-4xl font-medium text-gray-700">
          Character <span className="font-light text-gray-500">Details</span>
        </h1>
        <div id="title" className="float-end">
          <Link href={"/"}>Back</Link>
        </div>
      </div>
      {showCharacterDetails()}
    </main>
  );
}
