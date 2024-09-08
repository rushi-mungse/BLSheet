import { Tag } from "antd";
import { MdAccessTime } from "react-icons/md";
import dateFormat from "dateformat";

import UpdateTodo from "../helpers/update";
import DeleteTodo from "../helpers/delete";
import { Todo } from "../../../../types";

import { strSlice } from "../../../../utils";
import { TODO_LEVEL_COLOR, TODO_STATUS_COLOR } from "../../../../constants";
import TodoDetailsDrawer from "./todo-details-drawer";

interface TodoCardProps {
  todo: Todo;
  refetchTodoList: () => void;
}

const TodoCard = ({ todo, refetchTodoList }: TodoCardProps) => {
  return (
    <div className="bg-card p-3 space-y-2 rounded-lg shadow-lg transition-transform transform border">
      <div className="flex items-center space-x-1">
        <h3 className="text-black font-medium">{strSlice(todo.title, 30)}</h3>
      </div>
      <p className="text-gray-700 pb-2 text-sm font-light h-[45px]">
        {strSlice(todo.description, 65)}
      </p>

      <div className="flex">
        <Tag color={TODO_LEVEL_COLOR[todo.level]}>
          {todo.level.toUpperCase()}
        </Tag>
        <Tag color={TODO_STATUS_COLOR[todo.status]}>
          {todo.status.toLocaleUpperCase()}
        </Tag>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="font-light flex items-center space-x-1 text-balck">
          <MdAccessTime />
          <span className="text-xs">
            {dateFormat(new Date(todo.createdAt), "HH:MM")}
          </span>
        </div>
        <div className="flex item-center justify-center space-x-3">
          <TodoDetailsDrawer todo={todo} />
          <UpdateTodo todo={todo} refetchTodoList={refetchTodoList} />
          <DeleteTodo objectId={todo._id} refetchTodoList={refetchTodoList} />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
