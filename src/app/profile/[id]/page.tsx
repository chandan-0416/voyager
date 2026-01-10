type props={
params:{
    id:string
}
}

export default async function UserProfile({ params }: props) { // handle the parameters
    const {id}= await params;
  return (
    <div>
      <h1 className="font-bold p-2 m-2 text-black justify-center item-center">Profile</h1>
      <hr />
      <p className="text-2xl mt-4">Profile Page 
        
        <span className="p-2 text-black bg-orange-500">{id}</span></p>
    </div>
  );
}