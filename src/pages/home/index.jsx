import React, { useState } from 'react';
import { Tree, Space, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import './index.less';

const defaultTreeData = [
  {
    title: '宇宙无敌yyds',
    key: 1,
    children: [
      {
        title: '子部门',
        key: 2,
        children: [],
      },
    ],
  },
];

const Home = () => {
  const [treeData, setTreeData] = useState(defaultTreeData);
  const [index, setIndex] = useState(3); // key值
  const [modifyKey, setModifyKey] = useState(-1); // 修改的key值 F
  const [value, setValue] = useState(''); // 输入框里面的值
  const [expandedKeys, setExpandedKeys] = useState([]);

  // 复制树
  const copyTree = (node) => {
    if (node && node.length) {
      return node.map((item) => ({
        title: item.title,
        key: item.key,
        children: copyTree(item.children),
      }));
    } else {
      return;
    }
  };

  const handleDel = (treeData, key) => {
    if (!treeData || !treeData.length) {
      return null;
    }
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) {
        treeData.splice(i, 1);
        break;
      }
      handleDel(treeData[i].children, key);
    }
  };

  // 删除节点
  const del = (nodeData) => {
    const newTree = copyTree(treeData);
    handleDel(newTree, nodeData.key);
    setTreeData(newTree);
  };

  // 寻找父节点
  const findParentNode = (key, node) => {
    if (!node) {
      return null;
    }
    if (node.children) {
      let children = node.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].key === key) {
          return node;
        } else {
          const res = findParentNode(key, children[i]);
          if (res) {
            return res;
          }
        }
      }
    }
    return null;
  };
  // 添加同级结构
  const addSameLevel = (key) => {
    let nakeTree = { children: copyTree(treeData) };
    let parentNode = findParentNode(key, nakeTree);
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push({
      title: '',
      key: index,
      children: [],
    });
    setModifyKey(index);
    setIndex(index + 1);
    setTreeData(nakeTree.children);
  };

  const handleModify = (treeData, key, value) => {
    if (!treeData || !treeData.length) {
      return;
    }
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].key === key) {
        treeData[i] = {
          ...treeData[i],
          title: value,
        };
        break;
      }
      handleModify(treeData[i].children, key, value);
    }
  };

  // 回车
  const onPressEnter = (e, key) => {
    const { value } = e.target;
    const newTree = copyTree(treeData);
    handleModify(newTree, key, value);
    setTreeData(newTree);
    setModifyKey(-1);
    setValue('');
  };

  // 添加子节点
  const addNext = (key, node) => {
    for (let i = 0; i < node.length; i++) {
      if (node[i].key === key) {
        if (!node[i].children) {
          node[i].children = [];
        }
        node[i].children.push({
          title: '',
          key: index,
          children: [],
        });
        setModifyKey(index);
        setIndex(index + 1);
        break;
      } else {
        if (node[i].children) {
          addNext(key, node[i].children);
        }
      }
    }
  };

  // 修改
  const modify = (key, val) => {
    setModifyKey(key);
    setValue(val);
  };

  // 输入框值发生改变
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const titleRender = (nodeData) => {
    const { title, key } = nodeData;
    return (
      <div className="titleRender">
        {modifyKey !== key ? (
          <div
            className="title"
            onDoubleClick={() => {
              modify(key, title);
            }}
          >
            {title}
          </div>
        ) : (
          <Input
            style={{ width: 150 }}
            value={value}
            onPressEnter={(e) => {
              onPressEnter(e, key);
            }}
            onChange={onChange}
            ref={inputRef}
          />
        )}
        <Space size={8}>
          <a
            className="operate"
            onClick={() => {
              if (modifyKey === key) return;
              addSameLevel(key);
            }}
            disabled={modifyKey === key}
          >
            新增同级节点
          </a>
          <a
            className="operate"
            onClick={() => {
              if (modifyKey === key) return;
              if (!expandedKeys.includes(key)) {
                setExpandedKeys([...expandedKeys, key]);
              }
              const newTree = copyTree(treeData);
              addNext(key, newTree);
              setTreeData(newTree);
            }}
            disabled={modifyKey === key}
          >
            新增子级节点
          </a>
          <a
            className="operate"
            onClick={() => {
              if (modifyKey === key) return;
              modify(key, title);
            }}
            disabled={modifyKey === key}
          >
            修改当前节点
          </a>
          <CloseCircleOutlined
            onClick={() => del(nodeData)}
            className="operate"
          />
        </Space>
      </div>
    );
  };

  const onExpand = (expandedKey, { expanded, node }) => {
    setExpandedKeys(expandedKey);
  };

  return (
    <div className="treeCard">
      <Tree
        blockNode
        selectable={false}
        titleRender={titleRender}
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
      />
    </div>
  );
};

export default Home;
