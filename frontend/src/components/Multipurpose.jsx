import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../redux/slices/group";
import { getUser } from "../localstorage manger/localstorage";

const Multipurpose = () => {
  const type = useSelector((state) => state.chatScreen.single.type);
  const users = useSelector((state) => state.chatScreen.array);
  const dispath = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [group, setGroup] = useState("");
  const isInside = (arr1, element) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] == element) {
        return true;
        break;
      }
    }
    return false;
  };
  const nameReturn = (id) => {
    return users.filter((e) => e._id == id)[0].name;
  };

  const setName = (e) => {
    setGroup(e.target.value);
  };

  const addToGroup = (id) => {
    if (!isInside(selectedUsers, id)) setSelectedUsers([...selectedUsers, id]);
    else setSelectedUsers(selectedUsers.filter((e) => e != id));
    console.log(selectedUsers);
  };
  const handleCreate = () => {
    dispath(
      createGroup({
        name: group,
        Members: selectedUsers,
        CreatedBy: getUser()._id,
      })
    );
  };
  return (
    <>
      <div>
        <div className="ml-5">
          Enter name of Group :{" "}
          <input
            type="text"
            onChange={setName}
            value={group}
            className="bg-slate-100 outline-[0.5px] px-3 py-1 outline-purple-900 ml-5"
          />
        </div>

        {type == "CREATE_GROUP" && (
          <div className=" flex flex-col ml-2 ">
            <div className="mt-10 ml-5"> <span className="bg-purple-900 text-white px-[6px] rounded-full">+</span>  Add Participants</div>
            <div className="flex flex-col gap-[1px]  mt-5  h-52 overflow-y-scroll ">
              
              {users?.map((e) => {
                return (
                  <div
                    onClick={() => addToGroup(e._id)}
                    key={e._id}
                    className={`${
                      isInside(selectedUsers, e._id)
                        ? "   bg-purple-900 text-white"
                        : ""
                    } px-4 py-2 rounded-sm `}
                  >
                    {e.name}
                  </div>
                );
              })}
            </div>
Added participants
            <div className="flex flex-row gap-3 flex-wrap mb-5 text-purple-900  font-bold">
              {selectedUsers.map((e) => (
                <div key={e}>{nameReturn(e)}</div>
              ))}
            </div>

            
              <div>
                <button
                  className="bg-purple-900 px-3 py-1 rounded text-white disabled:bg-slate-300 disabled:text-slate-500"
                  onClick={handleCreate}
                  disabled={selectedUsers.length < 1 || group.length < 1}
                >
                  {" "}
                  + Create Group{" "}
                </button>
              </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Multipurpose;
