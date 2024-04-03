import * as React from 'react';


export function Title() {
  const [msg, setMsg] = React.useState("Hello8");
  return (
    <>
      <h1>{msg}</h1>
    </>);
}
