// type Props = {
//     params: Promise<{
//         experienceId: string;
//     }>;
// };

// const ExperienceDetails = async ({params} : Props) => {
//     const { experienceId } = await params;
// return (
//     <div>
//         <h1> Experience detail page!</h1>
//         <h2>Experience ID : {params.experienceId}</h2>

//     </div>

//     )
// }

// export default ExperienceDetails;


type Props = {
  params: Promise<{
    experienceId: string;
  }>;
};

export default async function ExperienceDetails({ params }: Props) {
  const { experienceId } = await params;

  return (
    <div>
      <h1>Experience detail page!</h1>
      <h2>Experience ID : {experienceId}</h2>
    </div>
  );
}
