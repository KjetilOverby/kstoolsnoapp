/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import RoleSuperAdmin from "~/components/roles/RoleSuperAdmin";

const Brukere = ({ theme }) => {
  const router = useRouter();
  const { data: users } = api.users.getUsers.useQuery({});

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const updateStatus = api.users.updateRoleBrukere.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleRoleChange = () => {
    if (selectedUserId && newRole) {
      updateStatus.mutate({ email: selectedUserId, role: newRole });

      setTimeout(() => {
        setSelectedUserId(null);
        setNewRole(null);
      }, 200);
    }
  };

  return (
    <div data-theme={theme as string} className="min-h-screen">
      <RoleSuperAdmin>
        <HeaderComponent />

        {selectedUserId && (
          <div className="absolute bg-primary p-5 shadow-xl">
            <p className="my-5">Change role for {selectedUserId}</p>
            <div>
              <div className="py-5">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="bg-primary"
                >
                  <option value="">Choose role</option>
                  <option value="LOGIN">LOGIN</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MO_ADMIN">MO_ADMIN</option>
                </select>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-info mb-5 text-white"
                  onClick={handleRoleChange}
                >
                  Change role
                </button>
                <button
                  className="btn btn-warning text-white"
                  onClick={() => setSelectedUserId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mx-2 mt-20 flex flex-col xl:mx-96">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-primary shadow sm:rounded-lg">
                <h1 className="mb-10 text-center text-xl">Brukere</h1>
                <table className="min-w-full divide-y divide-primary">
                  <thead className="bg-accent">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary bg-base-100">
                    {users?.map((user, personIdx) => (
                      <tr className="hover:bg-primary" key={user.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-neutral">
                            {user.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-neutral">
                            {user.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="text-sm text-gray-500">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-10 w-10 rounded-full"
                            />
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            className={`text-sm  ${user.role === "LOGIN" ? "text-red-500" : "text-gray-400"}`}
                          >
                            {user.role}
                          </div>
                          <button onClick={() => setSelectedUserId(user.email)}>
                            Change role
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </RoleSuperAdmin>
    </div>
  );
};

export default Brukere;
