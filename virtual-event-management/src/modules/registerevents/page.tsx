"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const commonStyles = {
  inputIcon:
    "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
  input:
    "block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600",
  button:
    "inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80",
  socialButton:
    "relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none",
  link: "font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline",
};



const LoginCard = () => {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState({
    organiserId: user?.id || "",
    organiser: user?.firstName || "" + user?.lastName || "",
    eventName: "",
    category: "",
    description: "",
    date: new Date().toString(),
    participants: "0",
    imageBase64:""
  });
  useEffect(()=>{
    if(isLoaded){
      setData((prev)=>({
        ...prev,
        organiserId:user?.id||""
      }))
    }
  },[isLoaded])
  
  const imgToBase64=(event:any)=>{
    console.log("here")
    const file=event.target.files[0];
    if(file){
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          console.log(result?.split(',')[1]);
          setData((prev) => ({
            ...prev,
            imageBase64: result?.split(',')[1]||"",
          }))
         
        };
        reader.readAsDataURL(file);
    }
  }
}
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/event/make-event", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      const response: { message: string; status: number } = await res.json();
      if (response.status == 200) {
        setData({
          organiserId: user?.id || "",
          organiser: user?.firstName || "" + user?.lastName || "",
          eventName: "",
          category: "",
          description: "",
          date: new Date().toString(),
          participants: "0",
          imageBase64:""
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoaded ? (
        <section className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
              <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                  Sign in to Celebration
                </h2>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-base font-medium text-gray-900">
                      Event Name
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="text"
                        placeholder="Enter Event Name"
                        className={commonStyles.input}
                        value={data.eventName}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            eventName: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        Category
                      </label>
                    </div>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="text"
                        placeholder="Category"
                        className={commonStyles.input}
                        value={data.category}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        Description
                      </label>
                    </div>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="text"
                        placeholder="Description"
                        className={commonStyles.input}
                        value={data.description}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        Enter date
                      </label>
                    </div>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="date"
                        placeholder="Description"
                        className={commonStyles.input}
                        value={data.date}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        Enter max Participants
                      </label>
                    </div>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <input
                        type="number"
                        placeholder="Enter max participants"
                        className={commonStyles.input}
                        value={data.participants}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            participants: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between">
                      
                    <input type="file" onChange={(e)=>{
                      imgToBase64(e);
                    }} />
                  </div>
                  <div>
                    <button type="submit" className={commonStyles.button} >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default LoginCard;
