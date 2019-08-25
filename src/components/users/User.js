import React from 'react';
import UserItem from './UserItem';
import Loader from '../layout/Loader';
function User(props) {
  // state = {
  //   users: [
  //     {
  //       id: '1',
  //       name: 'Nehal',
  //       lastName: 'Jethwa',
  //       img: 'https://api.adorable.io/avatars/128/abott@adorable.png'
  //     },
  //     {
  //       id: '2',
  //       name: 'Aakash',
  //       lastName: 'Jethwa',
  //       img: 'https://api.adorable.io/avatars/128/abott@adorable.png'
  //     },
  //     {
  //       id: '3',
  //       name: 'Jinal',
  //       lastName: 'Jethwa',
  //       img: 'https://api.adorable.io/avatars/128/abott@adorable.png'
  //     }
  //   ]
  // };

  const { items, loading } = props;
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="grid-container" style={gridStyle}>
        {items.map(item => (
          <UserItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
  margin: '5%'
};

export default User;
