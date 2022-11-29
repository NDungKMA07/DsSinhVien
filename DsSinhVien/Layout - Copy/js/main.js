let studentList = [];

//lay danh sach sinh vien tu backend
const fetchStudents = () => {
  axios({
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET",
  })
    .then((res) => {
      studentList = res.data;
      renderStudents();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Hien thi danh sach sinh vien 
const renderStudents = () => {
  let htmlContent = '';
  for (let student of studentList) {
    htmlContent += `
    <tr>
    <td>${student.MaSV}</td>
    <td>${student.HoTen}</td>
    <td>${student.Email}</td>
    <td>${student.SoDT}</td>
    <td>${student.DiemToan}</td>
    <td>${student.DiemLy}</td>
    <td>${student.DiemHoa}</td>
     <td>
       <button class="btn btn-danger" onclick="deleteStudent('${student.MaSV}')">Xóa</button>
       <button class="btn btn-info" onclick="getStudent('${student.MaSV}')">Cập nhật</button>
     </td>
    </tr>
    `
  }
  document.getElementById('tableDanhSach').innerHTML = htmlContent;
};

// //Them sinh vien
const addStudent = () => {
  let studentId = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let CMND = document.getElementById('idCard').value;
  let diemToan = document.getElementById('math').value;
  let diemLy = document.getElementById('physics').value;
  let diemHoa = document.getElementById('chemistry').value;

  const SVien = new sinhVien(studentId, name, email, phone, CMND, diemToan, diemLy, diemHoa);

  axios({
    url: "https://svcy.myclass.vn/api/SinhVien/ThemSinhVien", // goi toi api
    method: "POST", // phuong thuc truyen
    data: SVien,
  })
    .then((res) => { // call thanh cong 
      fetchStudents();
    })
    .catch((err) => { // call that bai
      console.log(err);
    });

};

//Xóa sinh viên
const deleteStudent = (id) => {
  axios({
    url: `https://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${id}`, // goi toi api
    method: "DELETE", // phuong thuc truyen
  })
    .then((res) => { // call thanh cong 
      fetchStudents();
      console.log(res);
    })
    .catch((err) => { // call that bai
      console.log(err);
    });
}

//Đưa thông tin lên form để sửa
const getStudent = (id) => {
  axios({
    url: `https://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${id}`, // goi toi api
    method: "GET", // phuong thuc truyen
  })
    .then((res) => { // call thanh cong 
      console.log(res);
      document.getElementById('btnThem').click(); // hien thi form vi form chi bat khi bat nut them sinh vien
      document.getElementById('id').value = res.data.MaSV;
      document.getElementById('name').value = res.data.HoTen;
      document.getElementById('email').value = res.data.Email;
      document.getElementById('phone').value = res.data.SoDT;
      document.getElementById('idCard').value = res.data.CMND;
      document.getElementById('math').value = res.data.DiemToan;
      document.getElementById('physics').value = res.data.DiemLy;
      document.getElementById('chemistry').value = res.data.DiemHoa;
      document.getElementById('id').setAttribute('disabled',true);
    })
    .catch((err) => { // call that bai
      console.log(err);
    });
};

//Cập nhật thông tin
const updateStudent = () =>{
  let studentId = document.getElementById('id').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let CMND = document.getElementById('idCard').value;
  let diemToan = document.getElementById('math').value;
  let diemLy = document.getElementById('physics').value;
  let diemHoa = document.getElementById('chemistry').value;

  const SVienUpdate = new sinhVien(studentId, name, email, phone, CMND, diemToan, diemLy, diemHoa);

  axios({
    url: "https://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien", // goi toi api
    method: "PUT", // phuong thuc truyen
    data: SVienUpdate,
  })
    .then((res) => { // call thanh cong 
      document.getElementById('id').setAttribute('disabled',false);
      fetchStudents();
    })
    .catch((err) => { // call that bai
      console.log(err);
    });
}




fetchStudents();