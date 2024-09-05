import { Button, Drawer } from "antd";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuChevronRightCircle } from "react-icons/lu";
import CreateTodoForm from "../cards/create-todo-form";
import { useSearchParams } from "react-router-dom";

interface CreateTodoProps {
  refetchTodoList: () => void;
}

const CreateTodo = ({ refetchTodoList }: CreateTodoProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerState, setDrawerState] = useState(
    searchParams.get("isCreate") ? true : false
  );
  const onCloseDrawer = () => setDrawerState(false);
  const onOpenDrawer = () => setDrawerState(true);
  const clearParams = () => {
    setSearchParams((params) => {
      params.delete("isCreate");
      return params;
    });
  };
  return (
    <div className="relative w-full md:w-fit">
      <Button
        className="ring-0 px-6 rounded-full w-full md:w-fit"
        type="primary"
        onClick={onOpenDrawer}
        icon={<IoMdAddCircleOutline />}
      >
        Todo
      </Button>
      <Drawer
        width={450}
        closeIcon={<LuChevronRightCircle className="text-primary size-5" />}
        open={drawerState}
        onClose={onCloseDrawer}
        title={<span className="text-primary">Create Todo</span>}
      >
        <CreateTodoForm
          refetchTodoList={refetchTodoList}
          onCloseDrawer={onCloseDrawer}
          clearParams={clearParams}
        />
      </Drawer>
    </div>
  );
};

export default CreateTodo;
