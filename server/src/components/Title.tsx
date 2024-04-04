import * as React from 'react';


export function Title() {
  const [msg, setMsg] = React.useState("Header");
  return (
    <>
      <h1>{msg}</h1>
    </>);
}
