import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const InfoListBranch = (props) => {
  const { branches } = props;
  const { pathname } = useRouter();

  return (
    <div>
      <div className="row h6">
        <div className="col-6">店社名/住所</div>
        <div className="col-3">TEL</div>
        <div className="col-3">FAX</div>
      </div>

      <hr />

      {branches?.map((branch) => (
        <div key={branch.id}>
          <div className="row">
            <div className="col-6">{branch.branchName}</div>
            <div className="col-3">{branch.tel}</div>
            <div className="col-3">{branch.fax}</div>
          </div>
          <div className="row">
            <div className="col">
              {branch.address1} {branch.address2}
            </div>
          </div>
          <div>
            {
              <Link
                href={`${pathname}/${branch.fk_companyId}?sel=${branch.id}`}
              >
                支店リンク
              </Link>
            }
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InfoListBranch;
