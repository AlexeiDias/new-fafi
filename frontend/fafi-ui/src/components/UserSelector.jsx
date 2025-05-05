function UserSelector({ user, onChange }) {
    return (
      <div>
       {user.avatar && (
  <span style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}>
    {user.avatar}
  </span>
)}

        <select value={user} onChange={e => onChange(e.target.value)}>
  <option value="Alexei">Alexei</option>
  <option value="Tais">Tais</option>
</select>

      </div>
    );
  }
  
  export default UserSelector;
  