// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import { Table, Select, Pagination, Button, Space, Tooltip } from "antd";
import "./TaskList.css";
import {
  getFilterTasks,
  deleteTask,
  getTask,
  addTask,
  updateTask,
} from "../../helpers";
import { toast } from "react-toastify";
import { columns } from "./columns";
import TaskItemModal from "./TaskItemModal";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
interface TaskListProps {
  userId: string;
}
const TaskList: React.FC<TaskListProps> = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [taskLoader, setTaskLoader] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [totalPages, setTotalPages] = useState(20);
  const [taskFilters, setTaskFilters] = useState({
    status: "all",
    taskFilter: "all",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isView, setIsViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setTaskLoader(true);
      const { status, taskFilter } = taskFilters;
      const { current, pageSize } = pagination;
      try {
        const tasksResp = await getFilterTasks({
          status,
          taskFilter,
          pages: current,
          counts: pageSize,
        });
        if (tasksResp.success) {
          setTasks(tasksResp.data.filteredData);
          setTotalPages(tasksResp.data.total);
        } else {
          toast.error(tasksResp.msg);
        }
        setTaskLoader(false);
      } catch (error) {
        setTaskLoader(false);
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [pagination, taskFilters]);

  const handleTableChange = async (current: number, pageSize: number) => {
    setPagination({ ...pagination, current, pageSize });
  };

  const handleSaveTask = async (task: any) => {
    const addTaskResp = await addTask(task);
    if (addTaskResp.success) toast.success(addTaskResp.msg);
    else toast.error(addTaskResp.msg);
    setPagination({ ...pagination });
    closeModal();
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = async (task: any) => {
    const updateTaskResp = await updateTask(task);
    if (updateTaskResp.success) toast.success(updateTaskResp.msg);
    else toast.error(updateTaskResp.msg);
    setPagination({ ...pagination });
    closeModal();
  };

  const handleEditViewTask = async (taskId: string, isView: boolean) => {
    const taskResp = await getTask(taskId);
    if (!taskResp.success) toast.error(taskResp.msg);
    setIsViewModal(isView);
    setSelectedTask(taskResp.data);
    setIsModalVisible(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const deleteResp = await deleteTask(taskId);
    if (deleteResp) {
      toast.success(deleteResp.msg);
      setPagination({ ...pagination });
    } else toast.error(deleteResp.msg);
  };

  const handleStatusFilterChange = (value: string) => {
    pagination.current = 1;
    setPagination(pagination);
    setTaskFilters({ ...taskFilters, status: value });
  };

  const handleTaskFilterChange = (value: string) => {
    setPagination({ ...pagination, current: 1 });
    setTaskFilters({ ...taskFilters, taskFilter: value });
  };

  return (
    <div className="task-list">
      <div className="filters">
        <Tooltip title="Add Task">
          <Button
            className="responsive-btn"
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setIsModalVisible(true)}
          />
        </Tooltip>
        <Space size="middle">
          <Select
            defaultValue={"all"}
            placeholder="Select Status"
            style={{ width: "20vh", marginBottom: 8 }}
            onChange={handleStatusFilterChange}
          >
            <Option value="todo">ToDo</Option>
            <Option value="inprogress">InProgress</Option>
            <Option value="completed">Completed</Option>
            <Option value="all">All</Option>
          </Select>
          <Select
            defaultValue={"all"}
            placeholder="Select Task"
            style={{ width: "10vh", marginBottom: 8 }}
            onChange={handleTaskFilterChange}
          >
            <Option value="my">My</Option>
            <Option value="all">All</Option>
          </Select>
        </Space>
      </div>

      <div className="table-container">
        <Table
          scroll={{ x: true }}
          columns={columns({
            handleDeleteTask,
            userId,
            handleEditViewTask,
          })}
          dataSource={tasks}
          loading={taskLoader}
          pagination={false}
        />
        <TaskItemModal
          visible={isModalVisible}
          onCancel={() => {
            closeModal();
          }}
          onView={() => {
            closeModal();
          }}
          onUpdate={handleUpdateTask}
          onSave={handleSaveTask}
          task={selectedTask}
          isView={isView}
        />
        <Pagination
          total={totalPages}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          showSizeChanger
          defaultPageSize={pagination.pageSize}
          defaultCurrent={pagination.current}
          current={pagination.current}
          onChange={handleTableChange}
          responsive={true}
        />
      </div>
    </div>
  );
};

export default TaskList;
