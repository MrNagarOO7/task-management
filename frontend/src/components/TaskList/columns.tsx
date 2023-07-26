import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Tag, Space, Tooltip, Button, Popconfirm } from "antd";

export const columns = (payload: {
  handleDeleteTask?: any;
  userId: string;
  handleEditViewTask?: any;
}) => {
  const { handleDeleteTask, userId, handleEditViewTask } = payload;
  return [
    {
      title: "Id",
      dataIndex: "taskId",
      key: "id",
    },
    {
      title: "Task Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, record: any, index: number) =>
        record.createdAt.split("T")[0],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => (
        <Tag
          color={
            record.status === "completed"
              ? "success"
              : record.status === "inprogress"
              ? "processing"
              : "default"
          }
        >
          {record.status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) =>
        record.userId === userId && (
          <Space size="middle">
            <Tooltip title="View Task">
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  handleEditViewTask(record.taskId, true);
                }}
              />
            </Tooltip>

            <Tooltip title="Update Task">
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  handleEditViewTask(record.taskId, false);
                }}
              />
            </Tooltip>

            <Tooltip title="Delete Task">
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => handleDeleteTask(record.taskId)}
                okText="Yes"
                cancelText="No"
              >
                <Button className={"delete-btn"} icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </Space>
        ),
    },
  ];
};
