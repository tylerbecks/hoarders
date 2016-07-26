import React from 'react';

export const UserEntry = (props) => (
  <div>
    <form>
      <input
        onChange={props.userChange}
        value={props.usernameText}
        type="text"
        placeholder="username"
      />
      <input
        onChange={props.passwordChange}
        value={props.passwordText}
        type="password"
        placeholder="password"
      />
    </form>
  </div>
);
