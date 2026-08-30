import {
  DebugChallenge,
  QuizQuestion,
  OutputPredictQuestion,
  CrudScenario,
  StudentRecord,
} from '../types';

export const INITIAL_STUDENTS: StudentRecord[] = [
  { id: 1, name: 'Ali Bin Ahmad', email: 'ali@email.com', programme: 'STM' },
  { id: 2, name: 'Siti Nurhaliza', email: 'siti@email.com', programme: 'STM' },
  { id: 3, name: 'Muhammad Danish', email: 'danish@email.com', programme: 'STM' },
  { id: 4, name: 'Nurul Izzah', email: 'izzah@email.com', programme: 'STM' },
];

export const DEBUG_CHALLENGES: DebugChallenge[] = [
  {
    id: 1,
    title: 'Missing Semicolon (Titik Bertindih Koma)',
    category: 'Syntax',
    codeSnippet: `<?php\necho "Hello STM"\n?>`,
    options: [
      'echo tiada kurungan',
      'Kurang tanda semicolon (;) di akhir baris statement',
      'Tag <?php tidak sah',
      'Perkataan echo mesti huruf besar',
    ],
    correctAnswer: 1,
    errorDescription: 'Parse error: syntax error, unexpected end of file / missing semicolon (;)',
    hint: 'Setiap statement PHP mesti diakhiri dengan simbol khas penamat arahan.',
    solution: `<?php\necho "Hello STM";\n?>`,
    explanation: 'Dalam PHP, setiap statement mesti ditamatkan dengan semicolon (;). Jika tertinggal, PHP interpreter akan menghasilkan syntax error.',
  },
  {
    id: 2,
    title: 'String Without Quotes',
    category: 'Variables',
    codeSnippet: `<?php\n$nama = Ali;\necho $nama;\n?>`,
    options: [
      'Variable $nama tidak boleh huruf kecil',
      'Nilai string Ali tiada tanda petik ("..." atau \'...\')',
      'echo tidak boleh mencetak variable',
      'Tiada closing tag',
    ],
    correctAnswer: 1,
    errorDescription: 'Fatal error: Uncaught Error: Undefined constant "Ali"',
    hint: 'Data jenis teks (String) wajib diapit dengan tanda petik tunggal atau berganda.',
    solution: `<?php\n$nama = "Ali";\necho $nama;\n?>`,
    explanation: 'Teks "Ali" ialah jenis data String dan mesti diapit oleh tanda petik ("Ali"). Tanpa tanda petik, PHP menyangka Ali ialah sebuah constant.',
  },
  {
    id: 3,
    title: 'Missing Closing Brace in if...else',
    category: 'Conditionals',
    codeSnippet: `<?php\n$markah = 70;\nif ($markah >= 50) {\n    echo "Lulus";\nelse {\n    echo "Gagal";\n}\n?>`,
    options: [
      'if tiada tanda kurungan',
      'Kurang tanda penutup kurungan kerinting (}) sebelum blok else',
      'Variable $markah tidak boleh bernilai nombor',
      'Perkataan else tidak dibenarkan',
    ],
    correctAnswer: 1,
    errorDescription: 'Parse error: syntax error, unexpected token "else"',
    hint: 'Setiap kurungan pembuka { memerlukan pasangan kurungan penutup } yang sepadan.',
    solution: `<?php\n$markah = 70;\nif ($markah >= 50) {\n    echo "Lulus";\n} else {\n    echo "Gagal";\n}\n?>`,
    explanation: 'Blok pernyataan if mesti ditutup dengan `}` sebelum memulakan kata kunci `else`.',
  },
  {
    id: 4,
    title: 'Function Name Typo (mysqli_connect)',
    category: 'Database Connection',
    codeSnippet: `<?php\n$conn = mysqli_conect("localhost", "root", "", "student_db");\n?>`,
    options: [
      'Ejaan nama fungsi salah (mysqli_conect sepatutnya mysqli_connect dengan dua huruf "n")',
      'Parameter database tidak cukup',
      'Variable $conn tidak sah',
      'Password tidak boleh dibiarkan kosong ""',
    ],
    correctAnswer: 0,
    errorDescription: 'Fatal error: Call to undefined function mysqli_conect()',
    hint: 'Perhatikan ejaan perkataan connect yang menggunakan huruf n berganda.',
    solution: `<?php\n$conn = mysqli_connect("localhost", "root", "", "student_db");\n?>`,
    explanation: 'Fungsi terbina dalam PHP ialah `mysqli_connect()`. Kesilapan ejaan (typo) menyebabkan PHP tidak menjumpai fungsi tersebut.',
  },
  {
    id: 5,
    title: 'SQL Keyword Typo in Query',
    category: 'SQL Query',
    codeSnippet: `<?php\n$sql = "SELEC * FROM students";\n$result = mysqli_query($conn, $sql);\n?>`,
    options: [
      'Simbol * tidak sah dalam SQL',
      'Ejaan kata kunci SQL salah (SELEC sepatutnya SELECT)',
      'Nama table students mesti huruf besar',
      'Fungsi mysqli_query tidak menerima 2 parameter',
    ],
    correctAnswer: 1,
    errorDescription: 'mysqli_sql_exception: You have an error in your SQL syntax near \'SELEC * FROM students\'',
    hint: 'Kata kunci SQL untuk membaca data daripada database ialah SELECT.',
    solution: `<?php\n$sql = "SELECT * FROM students";\n$result = mysqli_query($conn, $sql);\n?>`,
    explanation: 'Arahan SQL untuk mengambil data ialah `SELECT`. Typo pada arahan SQL akan ditolak oleh database engine MySQL.',
  },
  {
    id: 6,
    title: 'Missing $ in Variable Declaration',
    category: 'Variables',
    codeSnippet: `<?php\numur = 20;\necho $umur;\n?>`,
    options: [
      'Nombor 20 mesti ada tanda petik',
      'Variable umur tiada simbol $ di hadapannya',
      'echo tidak boleh menggunakan $umur',
      'Statement terminator tiada',
    ],
    correctAnswer: 1,
    errorDescription: 'Parse error: syntax error, unexpected token "="',
    hint: 'Semua pembolehubah (variable) dalam PHP WAJIB dimulakan dengan simbol dollar ($).',
    solution: `<?php\n$umur = 20;\necho $umur;\n?>`,
    explanation: 'Dalam PHP, semua nama variable mesti bermula dengan tanda `$`, contohnya `$umur = 20;`.',
  },
  {
    id: 7,
    title: 'Undefined POST Key Mismatch',
    category: 'Form Handling',
    codeSnippet: `<!-- HTML: <input type="text" name="student_name"> -->\n<?php\n$nama = $_POST['nama'];\n?>`,
    options: [
      '$_POST mesti guna huruf kecil',
      'Kekunci $_POST[\'nama\'] tidak sama dengan attribute name="student_name" pada HTML Form',
      'PHP tidak boleh membaca input jenis text',
      'Tiada tag form',
    ],
    correctAnswer: 1,
    errorDescription: 'Warning: Undefined array key "nama"',
    hint: 'Nilai di dalam $_POST[\'...\'] mesti sama tepat huruf besar/kecil dengan attribute name dalam HTML form.',
    solution: `<!-- HTML: <input type="text" name="student_name"> -->\n<?php\n$nama = $_POST['student_name'];\n?>`,
    explanation: 'Nama kunci dalam superglobal array `$_POST[\'student_name\']` mesti sama tepat dengan attribute `name="student_name"` pada elemen form HTML.',
  },
  {
    id: 8,
    title: 'Missing WHERE Clause in SQL DELETE',
    category: 'Database Safety',
    codeSnippet: `<?php\n// Ingin memadam pelajar Ali yang mempunyai ID = 1\n$sql = "DELETE FROM students";\nmysqli_query($conn, $sql);\n?>`,
    options: [
      'DELETE mesti menggunakan perkataan REMOVE',
      'Tiada klausa WHERE id=1, menyebabkan SEMUA rekod dalam table terpadam!',
      'Nama table students salah',
      'mysqli_query tidak boleh menjalankan DELETE',
    ],
    correctAnswer: 1,
    errorDescription: 'Logic Bug: Table emptied! All student records were deleted unintentionally.',
    hint: 'Jika anda ingin memadam satu rekod khusus, klausa WHERE dengan ID adalah wajib.',
    solution: `<?php\n$sql = "DELETE FROM students WHERE id = 1";\nmysqli_query($conn, $sql);\n?>`,
    explanation: 'Arahan `DELETE FROM students` tanpa klausa `WHERE id = 1` akan memadam kesemua baris rekod dalam table students.',
  },
];

export const PREDICT_QUESTIONS: OutputPredictQuestion[] = [
  {
    id: 1,
    code: `<?php\n$a = 5;\n$b = 10;\necho $a + $b;\n?>`,
    options: ['5', '10', '15', '510'],
    correctAnswer: 2,
    explanation: 'Operasi penambahan nombor (5 + 10) menghasilkan nilai integer 15.',
  },
  {
    id: 2,
    code: `<?php\n$a = 10;\n$b = 5;\necho $a * $b;\n?>`,
    options: ['15', '50', '2', '105'],
    correctAnswer: 1,
    explanation: 'Simbol * ialah operator pendaraban dalam PHP: 10 * 5 = 50.',
  },
  {
    id: 3,
    code: `<?php\n$nama = "Ali";\n$program = "STM";\necho $nama . " " . $program;\n?>`,
    options: ['AliSTM', 'Ali STM', '$nama $program', 'Error'],
    correctAnswer: 1,
    explanation: 'Operator titik (.) dalam PHP digunakan untuk mencantum (concatenation) string dengan jarak " ".',
  },
  {
    id: 4,
    code: `<?php\n$markah = 45;\nif ($markah >= 50) {\n    echo "Lulus";\n} else {\n    echo "Gagal";\n}\n?>`,
    options: ['Lulus', 'Gagal', '45', 'Tiada output'],
    correctAnswer: 1,
    explanation: 'Nilai 45 adalah kurang daripada 50, maka syarat ($markah >= 50) adalah false dan blok else ("Gagal") akan dijalankan.',
  },
  {
    id: 5,
    code: `<?php\nfor ($i = 1; $i <= 3; $i++) {\n    echo $i . "-";\n}\n?>`,
    options: ['1-2-3-', '123', '1-2-3', '3-2-1-'],
    correctAnswer: 0,
    explanation: 'Loop bermula dengan $i=1 sehingga $i=3, setiap kitaran mencetak nombor diikuti tanda sempang (-): 1-2-3-.',
  },
  {
    id: 6,
    code: `<?php\n$x = 10;\n$y = "10";\nif ($x == $y) {\n    echo "Sama Nilai";\n} else {\n    echo "Tidak Sama";\n}\n?>`,
    options: ['Sama Nilai', 'Tidak Sama', 'Error', '10'],
    correctAnswer: 0,
    explanation: 'Operator == membandingkan nilai sahaja (10 == "10" bernilai true kerana type coercion PHP).',
  },
];

export const CRUD_SCENARIOS: CrudScenario[] = [
  {
    id: 1,
    scenario: 'Pelajar baru mendaftar masuk ke semester 1 dan maklumatnya dimasukkan ke sistem.',
    correctAction: 'INSERT',
    explanation: 'INSERT digunakan untuk menambah rekod baharu ke dalam table database.',
  },
  {
    id: 2,
    scenario: 'Pelajar menukar alamat email peribadi kepada email rasmi Kolej Komuniti.',
    correctAction: 'UPDATE',
    explanation: 'UPDATE digunakan untuk mengemaskini maklumat rekod sedia ada.',
  },
  {
    id: 3,
    scenario: 'Pensyarah ingin memaparkan senarai semua pelajar kelas STM2.',
    correctAction: 'SELECT',
    explanation: 'SELECT digunakan untuk membaca atau mengambil (retrieve) data daripada database.',
  },
  {
    id: 4,
    scenario: 'Rekod pelajar yang telah berhenti (berpindah kolej) dikeluarkan daripada sistem.',
    correctAction: 'DELETE',
    explanation: 'DELETE digunakan untuk memadam atau membuang rekod daripada database.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: '4.1 Introduction to PHP',
    question: 'Apakah maksud sebenar bagi akronim PHP?',
    type: 'mcq',
    options: [
      'Personal Home Page',
      'PHP: Hypertext Preprocessor',
      'Private Hyperlink Protocol',
      'Programming Host Platform',
    ],
    correctAnswer: 1,
    explanation: 'PHP ialah akronim rekursif bagi "PHP: Hypertext Preprocessor".',
  },
  {
    id: 2,
    topic: '4.1 PHP Features',
    question: 'PHP ialah bahasa pengaturcaraan jenis:',
    type: 'mcq',
    options: [
      'Client-side scripting language (dijalankan di browser)',
      'Server-side scripting language (dijalankan di web server)',
      'Operating System software',
      'Database Management System',
    ],
    correctAnswer: 1,
    explanation: 'PHP ialah Server-side scripting language yang diproses oleh web server seperti Apache sebelum menghasilkan output HTML kepada browser.',
  },
  {
    id: 3,
    topic: '4.2 PHP Syntax',
    question: 'Manakah tag pembuka dan penutup yang betul untuk skrip PHP?',
    type: 'mcq',
    options: [
      '<script> ... </script>',
      '<?php ... ?>',
      '<% ... %>',
      '<?php ... </php>',
    ],
    correctAnswer: 1,
    explanation: 'Skrip PHP bermula dengan tag `<?php` dan ditutup dengan tag `?>`.',
  },
  {
    id: 4,
    topic: '4.2 PHP Syntax',
    question: 'Apakah simbol yang WAJIB diletakkan pada penamat setiap baris statement PHP?',
    type: 'mcq',
    options: [
      'Titik bertindih (:)',
      'Titik bertindih koma / Semicolon (;)',
      'Titik (.)',
      'Tanda seru (!)',
    ],
    correctAnswer: 1,
    explanation: 'Setiap statement PHP mesti diakhiri dengan semicolon (;).',
  },
  {
    id: 5,
    topic: '4.2 Variables',
    question: 'Manakah cara pengisytiharan variable yang SAH dalam PHP?',
    type: 'mcq',
    options: [
      'var nama = "Ali";',
      '$nama = "Ali";',
      'dim nama = "Ali";',
      'nama$ = "Ali";',
    ],
    correctAnswer: 1,
    explanation: 'Semua pembolehubah dalam PHP mesti dimulakan dengan simbol dollar `$`.',
  },
  {
    id: 6,
    topic: '4.2 Comments',
    question: 'Manakah antara berikut BUKAN cara menulis komen yang sah dalam PHP?',
    type: 'mcq',
    options: [
      '// Ini komen baris tunggal',
      '# Ini komen baris tunggal',
      '/* Ini komen berbilang baris */',
      '<!-- Ini komen PHP -->',
    ],
    correctAnswer: 3,
    explanation: '`<!-- ... -->` ialah format komen HTML, bukan komen PHP.',
  },
  {
    id: 7,
    topic: '4.2 Operators',
    question: 'Apakah simbol operator untuk mencantumkan (concatenate) dua String dalam PHP?',
    type: 'mcq',
    options: ['+', '&', '.', '&&'],
    correctAnswer: 2,
    explanation: 'Dalam PHP, simbol titik (.) digunakan untuk mencantumkan string. Simbol + hanya untuk operasi matematik penambahan.',
  },
  {
    id: 8,
    topic: '4.2 Conditionals',
    question: 'Jika $markah = 50, apakah output bagi kod berikut:\nif ($markah >= 50) { echo "Lulus"; } else { echo "Gagal"; }',
    type: 'predict',
    options: ['Lulus', 'Gagal', 'Error', '50'],
    correctAnswer: 0,
    explanation: 'Kerana syarat menggunakan `>=` (lebih besar atau sama dengan 50), nilai 50 memenuhi syarat dan menghasilkan "Lulus".',
  },
  {
    id: 9,
    topic: '4.3 Database DBMS',
    question: 'Dalam analogi database, "Filing Cabinet" mewakili Database dan "Folder" mewakili:',
    type: 'mcq',
    options: ['Column / Field', 'Table', 'Row / Record', 'SQL'],
    correctAnswer: 1,
    explanation: 'Database = Filing Cabinet, Table = Folder fail, Row = Sekeping rekod data, Column = Ruang medan maklumat.',
  },
  {
    id: 10,
    topic: '4.4 Database Table',
    question: 'Apakah arahan SQL yang tepat untuk membina database bernama "student_db"?',
    type: 'mcq',
    options: [
      'MAKE DATABASE student_db;',
      'CREATE DATABASE student_db;',
      'NEW DATABASE student_db;',
      'BUILD DATABASE student_db;',
    ],
    correctAnswer: 1,
    explanation: 'Sintaks SQL standard untuk membina pangkalan data baharu ialah `CREATE DATABASE nama_db;`.',
  },
  {
    id: 11,
    topic: '4.5 Database Connection',
    question: 'Apakah 4 parameter yang diperlukan oleh fungsi mysqli_connect() mengikut urutan?',
    type: 'mcq',
    options: [
      'Server, Username, Password, Database Name',
      'Database Name, Password, Username, Server',
      'Username, Server, Database Name, Port',
      'Table Name, Host, User, Pass',
    ],
    correctAnswer: 0,
    explanation: '`mysqli_connect("host", "username", "password", "database_name")` memerlukan Server/Host, Username, Password, dan Database Name.',
  },
  {
    id: 12,
    topic: '4.6 CRUD - Insert',
    question: 'Manakah arahan SQL yang betul untuk memasukkan data pelajar baharu?',
    type: 'mcq',
    options: [
      'ADD INTO students (name, email) VALUES (\'Ali\', \'ali@email.com\');',
      'INSERT INTO students (name, email) VALUES (\'Ali\', \'ali@email.com\');',
      'SAVE TO students SET name=\'Ali\';',
      'PUT INTO students (name, email) VALUES (\'Ali\', \'ali@email.com\');',
    ],
    correctAnswer: 1,
    explanation: 'Arahan SQL untuk menambah data ialah `INSERT INTO nama_table (kolum...) VALUES (nilai...);`.',
  },
  {
    id: 13,
    topic: '4.6 CRUD - Retrieve',
    question: 'Arahan SQL `SELECT * FROM students;` membawa maksud:',
    type: 'mcq',
    options: [
      'Memadam semua rekod dalam table students',
      'Mengambil semua kolum dan semua rekod dari table students',
      'Mengira bilangan pelajar dalam table students',
      'Membina kolum baru bernama students',
    ],
    correctAnswer: 1,
    explanation: 'Simbol `*` (asterisk) dalam query SELECT bermaksud memilih "semua kolum" daripada table.',
  },
  {
    id: 14,
    topic: '4.6 Search',
    question: 'Klausa SQL manakah yang digunakan untuk mencari rekod pelajar yang namanya mengandungi "Ali"?',
    type: 'mcq',
    options: [
      'WHERE name = \'Ali\'',
      'WHERE name LIKE \'%Ali%\'',
      'SEARCH name CONTAINS \'Ali\'',
      'FILTER BY name = \'Ali\'',
    ],
    correctAnswer: 1,
    explanation: 'Kata kunci `LIKE \'%Ali%\'` digunakan bersama wildcard `%` untuk mencari padanan teks di mana-mana posisi.',
  },
  {
    id: 15,
    topic: '4.6 Authentication',
    question: 'Apakah aliran logik asas untuk proses User Authentication dalam sistem web?',
    type: 'mcq',
    options: [
      'User → Simpan data terus ke Database tanpa semak',
      'User hantar Form Login → PHP semak padanan User/Pass dalam Database → Jika sah beri akses, jika tidak paparkan Error',
      'User buka website → Web terus anggap Admin secara automatik',
      'Database hantar password ke browser dahulu',
    ],
    correctAnswer: 1,
    explanation: 'User Authentication menerima input dari form, dihantar ke PHP, disemak padanannya dengan rekod dalam database, dan menentukan status kebenaran masuk.',
  },
];

export const COMMON_MISTAKES = [
  {
    id: 1,
    title: 'Lupa Tanda Semicolon (;)',
    wrong: `<?php\n  $nama = "Ali"\n  $umur = 20\n?>`,
    correct: `<?php\n  $nama = "Ali";\n  $umur = 20;\n?>`,
    note: 'Setiap statement PHP mesti ditamatkan dengan tanda semicolon (;).',
  },
  {
    id: 2,
    title: 'Lupa Tanda $ Pada Variable',
    wrong: `<?php\n  nama = "Ali";\n  echo nama;\n?>`,
    correct: `<?php\n  $nama = "Ali";\n  echo $nama;\n?>`,
    note: 'Semua variable PHP mesti bermula dengan tanda dollar ($).',
  },
  {
    id: 3,
    title: 'Salah Nama Database Dalam Connection',
    wrong: `// Nama DB sebenar: student_db\n$conn = mysqli_connect("localhost", "root", "", "students_db");`,
    correct: `// Pastikan nama DB sepadan tepat\n$conn = mysqli_connect("localhost", "root", "", "student_db");`,
    note: 'Semak ejaan nama pangkalan data dalam phpMyAdmin sebelum connect.',
  },
  {
    id: 4,
    title: 'Salah Table Name Dalam Query SQL',
    wrong: `// Table sebenar bernama students (ada s)\n$sql = "SELECT * FROM student";`,
    correct: `// Gunakan nama table yang tepat\n$sql = "SELECT * FROM students";`,
    note: 'Database table bersifat sensitif terhadap nama jamak (singular vs plural).',
  },
  {
    id: 5,
    title: 'Salah Field/Column Name Dalam Form vs PHP',
    wrong: `<!-- HTML: <input name="email_pelajar"> -->\n$email = $_POST['email']; // KEY MISMATCH!`,
    correct: `<!-- HTML: <input name="email"> -->\n$email = $_POST['email']; // TEPAT SEPADAN!`,
    note: 'Nama dalam $_POST[\'...\'] mesti sama 100% dengan attribute name pada HTML.',
  },
  {
    id: 6,
    title: 'Connection Gagal Tapi Terus Jalankan Query',
    wrong: `$conn = mysqli_connect("localhost", "root", "", "db");\n$result = mysqli_query($conn, $sql); // Tidak semak status conn!`,
    correct: `$conn = mysqli_connect("localhost", "root", "", "db");\nif (!$conn) {\n    die("Sambungan gagal: " . mysqli_connect_error());\n}`,
    note: 'Sentiasa semak sama ada sambungan berjaya menggunakan if (!$conn) { die(...); }.',
  },
  {
    id: 7,
    title: 'Lupa Tanda Petik Pada Nilai String SQL',
    wrong: `$sql = "INSERT INTO students (name) VALUES (Ali)"; // Error!`,
    correct: `$sql = "INSERT INTO students (name) VALUES ('Ali')"; // Tepat!`,
    note: 'Nilai teks/string dalam arahan SQL wajib diapit dengan tanda petik tunggal (\'...\').',
  },
  {
    id: 8,
    title: 'Lupa Klausa WHERE Semasa UPDATE / DELETE',
    wrong: `// AMARAN BAHAYA: Semua rekod akan terpadam!\n$sql = "DELETE FROM students";`,
    correct: `// Padam hanya rekod ID berkenaan sahaja\n$sql = "DELETE FROM students WHERE id = 1";`,
    note: 'Pastikan klausa WHERE disertakan untuk mengelakkan perubahan ke atas seluruh database.',
  },
];

export const INDUSTRY_TIPS = [
  {
    id: 1,
    title: 'Padanan Nama Medan (Field Name Consistency)',
    tip: 'Pastikan attribute name pada borang HTML sentiasa sama tepat huruf besar/kecil dengan nama kekunci $_POST[\'...\'] dan kolum database.',
  },
  {
    id: 2,
    title: 'Uji Connection Terlebih Dahulu',
    tip: 'Sebelum membina borang CRUD yang panjang, cipta fail test_conn.php ringkas untuk memastikan sambungan ke MySQL berjaya 100%.',
  },
  {
    id: 3,
    title: 'Semak Query SQL Secara Berperingkat',
    tip: 'Jika data tidak masuk ke database, cetak query menggunakan echo $sql; dan uji terus dalam tab SQL di phpMyAdmin untuk melihat ralat tepat.',
  },
  {
    id: 4,
    title: 'Amalkan Indentation & Formatting Kemas',
    tip: 'Gunakan susunan indentasi (jarak tab) yang konsisten agar mudah mengesan kurungan { } atau tanda semicolon ; yang tertinggal.',
  },
  {
    id: 5,
    title: 'Gunakan Komen Untuk Dokumentasi Kod',
    tip: 'Tulis komen ringkas // pada setiap bahagian penting seperti sambungan DB, query, dan validasi agar mudah disemak oleh pensyarah atau rakan kumpulan.',
  },
];

export const STARTER_CHALLENGE = {
  title: 'STUDENT REGISTRATION SYSTEM (Mini Challenge)',
  scenario: 'Lengkapkan skrip PHP di bawah untuk menerima data daripada HTML Form dan memasukkan rekod pelajar ke dalam database "student_db".',
  starterCode: `<?php
// 1. Lengkapkan parameter sambungan database
$conn = mysqli_connect("localhost", "root", "", "__________");

if (!$conn) {
    die("Connection failed");
}

// 2. Semak jika form dihantar menggunakan method POST
if (isset($_POST['__________'])) {

    // 3. Ambil data dari input form
    $nama = $_POST['nama'];
    $email = $_POST['email'];
    $programme = $_POST['programme'];

    // 4. Lengkapkan SQL INSERT query
    $sql = "__________ INTO students (name, email, programme) 
            VALUES ('$nama', '$email', '$programme')";

    // 5. Jalankan query
    if (mysqli_query($conn, $sql)) {
        echo "Pelajar berjaya didaftarkan!";
    }
}
?>`,
  hints: [
    'Hint 1: Parameter keempat mysqli_connect ialah nama database iaitu "student_db".',
    'Hint 2: Form submit button mempunyai name="submit" atau semak nama input utama seperti "nama".',
    'Hint 3: Kata kunci SQL untuk memasukkan data baharu ialah perkataan INSERT.',
  ],
  solutionCode: `<?php
// Sambungan ke database student_db
$conn = mysqli_connect("localhost", "root", "", "student_db");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Semak penghantaran form
if (isset($_POST['submit'])) {

    $nama = $_POST['nama'];
    $email = $_POST['email'];
    $programme = $_POST['programme'];

    // SQL INSERT statement
    $sql = "INSERT INTO students (name, email, programme) 
            VALUES ('$nama', '$email', '$programme')";

    if (mysqli_query($conn, $sql)) {
        echo "<p style='color: green;'>✓ Pelajar berjaya didaftarkan!</p>";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>`,
};
