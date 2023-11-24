import React, { useState } from "react";
import { usePathManager } from "@/components/containers/handleItem";
import apiClient from "../../../../lib/apiClient";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ProjectModalCreate } from "./ProjectModalCreate";

export const HeaderProject = (props) => {
  const { items, setIsCreate } = props;
  const { pathMove } = usePathManager();
  const router = useRouter();
  const query = router.query;
  // const isStatus = query.isStatus === "false";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpenState = { isModalOpen, setIsModalOpen };

  //削除
  const deleteItem = async () => {
    // if (!window.confirm("削除してもよろしいですか？")) return;
    const url = "/projects";

    try {
      await apiClient.delete(`${url}/${query.sel}`);
      pathMove(false, items, query.sel);
      toast.warn("削除しました");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-secondary">
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-success m-1"
          onClick={() => setIsModalOpen(true)}
        >
          新規作成
        </button>
        {isModalOpen && (
          <ProjectModalCreate
            items={items}
            isModalOpenState={isModalOpenState}
            setIsCreate={setIsCreate}
          />
        )}

        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={deleteItem}
        >
          削除
        </button>
      </div>
    </div>
  );
};
