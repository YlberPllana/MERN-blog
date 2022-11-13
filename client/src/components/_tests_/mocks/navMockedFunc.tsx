export const handleLogout = (): void => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

function setUser(_undefined: undefined) {
  throw new Error("Function not implemented.");
}
