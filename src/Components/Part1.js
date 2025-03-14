import React, { useState, useEffect } from 'react';
import styles from './part1.css';

const Part1 = (props) => {
  const [formData, setFormData] = useState({ grpName: ' ', color: ' ' });
  const setGroups = props.setGroups;
  const groups = props.groups;
  const color = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };
  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.grpName);
  };

  const handleChangeColor = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.getAttribute('color'),
    });
    console.log(formData.color);
  };

  const handleSubmit = (e) => {
    if (formData.color === '') {
      alert('Please select a color');
      return;
    }
    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem('groups', JSON.stringify(newGroup));
    props.closeModal(false);
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <>
          <div className={styles.part1BackgroundMobile}>
            <div className={styles.part1ContainerMobile}>
              <span>
                <button
                  className={styles.closeButtonMobile}
                  onClick={() => props.closeModal(false)}
                >
                  X
                </button>
              </span>
              <h2 className={styles.part1Heading}>Create New Group</h2>
              <label className={styles.part1Grp}>Group Name</label>
              <input
                type="text"
                className={styles.part1TextMobile}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
              <br />
              <label className={styles.part1Color}>Choose Colour</label>
              {color.map((color, index) => (
                <button
                  className={`${styles.colorButton} ${
                    formData.color === color ? 'selected' : ''
                  }`}
                  name="color"
                  color={color}
                  key={index}
                  id={color}
                  style={{
                    height: '40px',
                    width: '40px',
                    background: color,
                    borderRadius: '25px',
                    marginRight: '10px',
                  }}
                  onClick={handleChangeColor}
                ></button>
              ))}
              <button
                className={styles.part1CreateMobile}
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.part1Background}>
          <div className={styles.part1Container}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.part1Heading}>Create New Group</h2>
            <label className={styles.part1Grp}>Group Name</label>
            <input
              type="text"
              className={styles.part1Text}
              name="grpName"
              placeholder="Enter your group name"
              onChange={handleChange}
            />
            <label className={styles.part1Color}>Choose Colour</label>
            {color.map((color, index) => (
              <button
                className={`${styles.colorButton}  ${
                  formData.color === color ? 'selected' : ''
                }`}
                name="color"
                color={color}
                key={index}
                id={color}
                style={{
                  height: '40px',
                  width: '40px',
                  background: color,
                  borderRadius: '25px',
                  marginRight: '10px',
                }}
                onClick={handleChangeColor}
              ></button>
            ))}
            <button className={styles.part1Create} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Part1;