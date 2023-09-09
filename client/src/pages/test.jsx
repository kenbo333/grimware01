export async function getServerSideProps(context) {
  console.log(context);

  // ... その他の処理 ...

  return {
    props: {},
  };
}

import React from "react";

const test = (props) => {
  return <div>test</div>;
};

export default test;
