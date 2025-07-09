import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [siteDetailsArray, setSiteDetailsArray] = useState([]);
  const passwdInputRef = useRef();
  const passwdBtnRef = useRef();

  useEffect(() => {
    let siteDetails = localStorage.getItem("siteDetails");

    if (siteDetails) {
      setSiteDetailsArray(JSON.parse(siteDetails));
    }
  }, []);

  const toggleShowPassword = () => {
    if (passwdBtnRef.current.src.includes("icons/eye.png")) {
      passwdInputRef.current.type = "text";
      passwdBtnRef.current.src = "icons/eyecross.png";
    } else {
      passwdInputRef.current.type = "password";
      passwdBtnRef.current.src = "icons/eye.png";
    }
  };

  const saveSiteDetails = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setSiteDetailsArray([...siteDetailsArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "siteDetails",
        JSON.stringify([...siteDetailsArray, { ...form, id: uuidv4() }])
      );
      toast.success("Details saved successfully!");
      setForm({ site: "", username: "", password: "" });
    } else {
      toast.error("Fill the required fields!", {autoClose: 2000});
    }
  };
  
  const editSiteDetails = (id) => {
    let siteDeatails = siteDetailsArray.find((item) => item.id === id);
    console.log(siteDeatails);
    setForm(siteDeatails);
    setSiteDetailsArray(siteDetailsArray.filter((item) => item.id !== id));
  };

  const deleteSiteDetails = (id) => {
    let userOption = confirm("Do you really want to delete the details?");

    if (userOption) {
      let updatedSiteDetailsArray = siteDetailsArray.filter(
        (item) => item.id !== id
      );
      setSiteDetailsArray(updatedSiteDetailsArray);
      localStorage.setItem(
        "siteDetails",
        JSON.stringify(updatedSiteDetailsArray)
      );

      toast.success("Password deleted successfully!", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCopyText = (text) => {
    toast.success("Copied to clipboard", { autoClose: 1500 });
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="pb-6">
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mycontainer md:container">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-400">&lt;</span>
          <span>Site</span>
          <span className="text-green-400">Lockr/&gt;</span>
        </h1>
        <p className="text-green-900 text-xl font-semibold text-center">
          Your own password manager
        </p>

        <div className="inputs text-black flex flex-col items-center gap-6 w-full mt-8">
          <input
            placeholder="Enter website URL"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            className="input"
          />
          <div className=" flex flex-col md:flex-row gap-4 w-full">
            <input
              placeholder="Enter Username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="input md:w-[60%]"
            />
            <div className="relative md:w-[40%]">
              <input
                placeholder="Enter Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                ref={passwdInputRef}
                className="input"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute top-3 right-3 cursor-pointer"
              >
                <img
                  ref={passwdBtnRef}
                  width={20}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={saveSiteDetails}
            className="bg-green-400 rounded-full px-4 py-1 border border-green-900 cursor-pointer hover:bg-green-500  w-fit max-auto flex items-center justify-center gap-2 font-medium"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>

            <span>Save</span>
          </button>
        </div>
        {/* <hr /> */}

        <div className="mt-4">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {siteDetailsArray.length === 0 && (
            <div className="font-bold text-green-500">No passwords to show</div>
          )}
          {siteDetailsArray && siteDetailsArray.length > 0 && (
            <div className="w-full overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden shadow-xl min-w-[600px] mb-10">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-2 text-sm md:text-base">Sitename</th>
                    <th className="py-2 px-2 text-sm md:text-base">Username</th>
                    <th className="py-2 px-2 text-sm md:text-base">Password</th>
                    <th className="py-2 px-2 text-sm md:text-base">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100 text-center">
                  {siteDetailsArray.map((item, index) => (
                    <tr key={index} className="text-xs md:text-base">
                      <td className="py-2 px-2">
                        <div className="flex items-center justify-center">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>
                          <div
                            className="flex ps-2 cursor-pointer"
                            onClick={() => handleCopyText(item.site)}
                          >
                            <i class="fa-solid fa-copy"></i>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <div
                            className="flex ps-2 cursor-pointer"
                            onClick={() => handleCopyText(item.username)}
                          >
                            <i class="fa-solid fa-copy"></i>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <div
                          className="flex items-center justify-center"
                          onClick={() => handleCopyText(item.password)}
                        >
                          {"*".repeat(item.password.length)}
                          <div className="flex ps-2 cursor-pointer">
                            <i class="fa-solid fa-copy"></i>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex justify-center items-center gap-4">
                          <div
                            className="cursor-pointer"
                            onClick={() => editSiteDetails(item.id)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => deleteSiteDetails(item.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Manager;
