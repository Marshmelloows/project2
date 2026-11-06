create table Make (
    MakeID int primary key auto_increment,
    MakeName varchar(50) not null,
    Manufacturer varchar(50) not null,
    year date not null,
    cost decimal(10,2) not null
);

create table VehicleType (
    TypeID int primary key auto_increment,
    TruckID uniqueidentifier not null,
    CarID uniqueidentifier not null,
    MotorcycleID uniqueidentifier not null,
    VanID uniqueidentifier not null
);

create table Part (
    PartID int primary key auto_increment,
    PartName varchar(50) not null,
    Catagory varchar(20) not null,
    Manufacturer varchar(50) foreign key references Make(Manufacturer),
    PartReliability varchar(20) not null,
    Material varchar(20) not null,
    Cost decimal(10,2) not null
);

create table Model (
    ModelID int primary key auto_increment,
    ModelName varchar(50) not null,
    MakeID foreign key references Make(MakeID),
    ModelInfo varchar(255) not null,
    TypeID foreign key references VehicleType(TypeID)
);

create table Compatibility (
    CompatibilityID int primary key auto_increment,
    ModelID foreign key references Model(ModelID),
    PartID foreign key references Part(PartID),
    CompatibilityInfo varchar(255) not null
);

create table Configuration (
    ConfigurationID int primary key auto_increment,
    ModelID foreign key references Model(ModelID),
    EngineType varchar(50) not null,
    TransmissionType varchar(50) not null,
    WheelType varchar(50) not null,
    DoorCount int not null,
    ConfigurationName varchar(50) not null,
    ConfigurationInfo varchar(255) not null
);

create table Vehicle (
    VehicleID int primary key auto_increment,
    VIN varchar(17) not null unique,
    ModelID foreign key references Model(ModelID),
    ConfigurationID foreign key references Configuration(ConfigurationID),
    Year date not null,
    Color varchar(20) not null,
    Mileage int not null,
    Price decimal(10,2) not null,
    Modifications varchar(255) not null
);

create table VehicleQuestions (
    VehicleQuestionID int primary key auto_increment,
    QuestionDescription varchar(255) not null,
    QuestionDate date not null
);

create table Questions (
    QuestionID int primary key auto_increment,
    QuestionDescription varchar(255) not null,
    QuestionDate date not null,
    VehicleQuestionID foreign key references VehicleQuestions(VehicleQuestionID)
);

create table Answers (
    AnswerID int primary key auto_increment,
    AnswerDescription varchar(255) not null,
    AnswerDate date not null,
    QuestionID foreign key references Questions(QuestionID),
    Feedback varchar(255) not null,
    ScoreID foreign key references Score(ScoreID),
    Answer varchar(255) not null
);

create table Quiz (
    QuizID int primary key auto_increment,
    QuizName varchar(50) not null,
    QuizDate date not null,
    ScoreID foreign key references Score(ScoreID),
    AnswerID foreign key references Answers(AnswerID)
)

create table Score (
    ScoreID int primary key auto_increment,
    ScoreValue int not null,
    ScoreDate date not null,
    ScoreStreak int not null
);

create table QuizAtempts (
    AttemptID int primary key auto_increment,
    QuizID foreign key references Quiz(QuizID),
    ScoreID foreign key references Score(ScoreID),
    AttemptDate date not null
    StartTime time not null,
    EndTime time not null,
    UserID foreign key references User(UserID)
);

create table Leaderboard (
    LeaderboardID int primary key auto_increment,
    UserID foreign key references User(UserID),
    QuizID foreign key references Quiz(QuizID),
    ScoreID foreign key references Score(ScoreID),
    LeaderbordName varchar(50) not null,
    LeaderbordDiscription varchar(255) not null,
);

create table User (
    UserID int primary key auto_increment,
    UserName varchar(50) not null,
    UserEmail varchar(50) not null unique,
    UserPassword varchar(255) not null,
    UserRole varchar(20) not null,
    UserStatus varchar(20) not null
);

-- Sample data: 5 rows per table
-- Run on EMPTY tables so the auto_increment IDs start at 1 and the foreign keys below line up.
-- Tables are filled in dependency order (parents before children).
-- Column spellings (Catagory, QuizAtempts, LeaderbordName...) match your CREATE TABLE statements.
-- UUID() is MySQL. In SQL Server use NEWID() instead.
 
-- 1. Make
insert into Make (MakeName, Manufacturer, year, cost) values
('Toyota',     'Toyota Motor Corporation', '2022-01-01', 32000.00),
('Ford',       'Ford Motor Company',       '2021-01-01', 41000.00),
('Honda',      'Honda Motor Co.',          '2023-01-01', 28500.00),
('Yamaha',     'Yamaha Motor Co.',         '2022-01-01', 14500.00),
('Volkswagen', 'Volkswagen AG',            '2020-01-01', 35000.00);
 
-- 2. VehicleType
insert into VehicleType (TruckID, CarID, MotorcycleID, VanID) values
(UUID(), UUID(), UUID(), UUID()),
(UUID(), UUID(), UUID(), UUID()),
(UUID(), UUID(), UUID(), UUID()),
(UUID(), UUID(), UUID(), UUID()),
(UUID(), UUID(), UUID(), UUID());
 
-- 3. Part
insert into Part (PartName, Catagory, Manufacturer, PartReliability, Material, Cost) values
('Brake Pad Set', 'Brakes',     'Toyota Motor Corporation', 'High',   'Ceramic', 89.99),
('Oil Filter',    'Engine',     'Ford Motor Company',       'High',   'Steel',   14.50),
('Spark Plug',    'Ignition',   'Honda Motor Co.',          'Medium', 'Iridium', 12.75),
('Chain Kit',     'Drivetrain', 'Yamaha Motor Co.',         'Medium', 'Steel',   120.00),
('Air Filter',    'Engine',     'Volkswagen AG',            'High',   'Paper',   22.30);
 
-- 4. Model (MakeID 1-5 = Make table, TypeID 1-5 = VehicleType table)
insert into Model (ModelName, MakeID, ModelInfo, TypeID) values
('Corolla',     1, 'Compact sedan, fuel efficient',          1),
('F-150',       2, 'Full-size pickup truck',                 2),
('CBR500R',     3, 'Sport motorcycle with a 471cc twin',     3),
('Transporter', 5, 'Mid-size panel van',                     4),
('MT-07',       4, 'Naked roadster motorcycle, 689cc twin',  5);
 
-- 5. Compatibility (ModelID, PartID)
insert into Compatibility (ModelID, PartID, CompatibilityInfo) values
(1, 1, 'Fits all Corolla trims from 2019 onward'),
(2, 2, 'Fits the 3.5L V6 and 5.0L V8 engines'),
(3, 3, 'Standard fit for the CBR500R'),
(5, 4, 'Fits the MT-07 with a 520 chain'),
(4, 5, 'Fits the 2.0L diesel Transporter');
 
-- 6. Configuration (ModelID)
insert into Configuration (ModelID, EngineType, TransmissionType, WheelType, DoorCount, ConfigurationName, ConfigurationInfo) values
(1, '1.8L Hybrid',         'CVT',                '16-inch alloy', 4, 'Corolla Hybrid GX', 'Entry hybrid trim with 16-inch alloys'),
(2, '3.5L V6 EcoBoost',    '10-speed automatic', '18-inch alloy', 4, 'F-150 XLT',         'Mid-range crew cab'),
(3, '471cc Parallel Twin', '6-speed manual',     '17-inch alloy', 0, 'CBR500R Standard',  'Base sport model'),
(4, '2.0L Turbo Diesel',   '7-speed DSG',        '17-inch steel', 4, 'Transporter Van',   'Panel van with a sliding side door'),
(5, '689cc Parallel Twin', '6-speed manual',     '17-inch alloy', 0, 'MT-07 Standard',    'Naked roadster base model');
 
-- 7. Vehicle (ModelID, ConfigurationID)
insert into Vehicle (VIN, ModelID, ConfigurationID, Year, Color, Mileage, Price, Modifications) values
('JTDKB20U793000001', 1, 1, '2022-01-01', 'White',  34500, 24990.00, 'None'),
('1FTEW1EP5NFA00002', 2, 2, '2021-01-01', 'Blue',   58200, 38500.00, 'Tow bar fitted'),
('JH2PC4000NK000003', 3, 3, '2023-01-01', 'Red',     8200,  9990.00, 'Aftermarket exhaust'),
('WV1ZZZ7HZNH000004', 4, 4, '2020-01-01', 'Silver', 91000, 27500.00, 'Roof racks and shelving'),
('JYARM3200NA000005', 5, 5, '2022-01-01', 'Black',  15400, 10990.00, 'Tail tidy and frame sliders');
 
-- 8. VehicleQuestions
insert into VehicleQuestions (QuestionDescription, QuestionDate) values
('Which manufacturer builds the Corolla?',                '2026-10-01'),
('What engine does the F-150 XLT use?',                   '2026-10-01'),
('How many doors does a standard CBR500R have?',          '2026-10-02'),
('What transmission does the Transporter use?',           '2026-10-02'),
('What does VIN stand for?',                              '2026-10-03');
 
-- 9. Questions (VehicleQuestionID)
insert into Questions (QuestionDescription, QuestionDate, VehicleQuestionID) values
('Which manufacturer builds the Corolla?',                '2026-10-01', 1),
('What engine does the F-150 XLT use?',                   '2026-10-01', 2),
('How many doors does a standard CBR500R have?',          '2026-10-02', 3),
('What transmission does the Transporter use?',           '2026-10-02', 4),
('What does VIN stand for?',                              '2026-10-03', 5);
 
-- 10. Score (needed before Answers, Quiz, QuizAtempts and Leaderboard)
insert into Score (ScoreValue, ScoreDate, ScoreStreak) values
(80,  '2026-10-01', 1),
(65,  '2026-10-02', 2),
(90,  '2026-10-03', 3),
(100, '2026-10-04', 4),
(55,  '2026-10-05', 1);
 
-- 11. User (needed before QuizAtempts and Leaderboard)
-- The passwords below are placeholders. Store real passwords as hashes, never as plain text.
insert into User (UserName, UserEmail, UserPassword, UserRole, UserStatus) values
('alex_t',   'alex.turner@example.com', 'hashed_password_1', 'Student',    'Active'),
('sam_k',    'sam.kelly@example.com',   'hashed_password_2', 'Student',    'Active'),
('jordan_p', 'jordan.page@example.com', 'hashed_password_3', 'Instructor', 'Active'),
('casey_m',  'casey.moore@example.com', 'hashed_password_4', 'Student',    'Inactive'),
('admin_01', 'admin@example.com',       'hashed_password_5', 'Admin',      'Active');
 
-- 12. Answers (QuestionID, ScoreID)
insert into Answers (AnswerDescription, AnswerDate, QuestionID, Feedback, ScoreID, Answer) values
('Toyota builds the Corolla.',                         '2026-10-01', 1, 'Correct, well done.',                       1, 'Toyota'),
('The F-150 XLT uses a 3.5L V6 EcoBoost engine.',      '2026-10-01', 2, 'Correct.',                                  2, '3.5L V6 EcoBoost'),
('A standard CBR500R has no doors.',                   '2026-10-02', 3, 'Correct, motorcycles have no doors.',       3, '0'),
('The Transporter uses a 7-speed DSG transmission.',   '2026-10-02', 4, 'Correct.',                                  4, '7-speed DSG'),
('VIN stands for Vehicle Identification Number.',      '2026-10-03', 5, 'Close. Remember the full name next time.',  5, 'Vehicle Identification Number');
 
-- 13. Quiz (ScoreID, AnswerID)
insert into Quiz (QuizName, QuizDate, ScoreID, AnswerID) values
('Vehicle Makes',          '2026-10-01', 1, 1),
('Engines and Drivetrain', '2026-10-01', 2, 2),
('Motorcycle Basics',      '2026-10-02', 3, 3),
('Transmissions',          '2026-10-02', 4, 4),
('Vehicle Identification', '2026-10-03', 5, 5);
 
-- 14. QuizAtempts (QuizID, ScoreID, UserID)
insert into QuizAtempts (QuizID, ScoreID, AttemptDate, StartTime, EndTime, UserID) values
(1, 1, '2026-10-01', '09:00:00', '09:12:00', 1),
(2, 2, '2026-10-01', '10:30:00', '10:44:00', 2),
(3, 3, '2026-10-02', '13:15:00', '13:27:00', 3),
(4, 4, '2026-10-02', '15:00:00', '15:10:00', 4),
(5, 5, '2026-10-03', '11:20:00', '11:38:00', 5);
 
-- 15. Leaderboard (UserID, QuizID, ScoreID)
insert into Leaderboard (UserID, QuizID, ScoreID, LeaderbordName, LeaderbordDiscription) values
(4, 4, 4, 'Top Scorers',     'Highest scores across all quizzes'),
(3, 3, 3, 'Weekly Leaders',  'Best scores this week'),
(1, 1, 1, 'Rising Stars',    'Most improved students'),
(2, 2, 2, 'Quick Finishers', 'Fastest completion times'),
(5, 5, 5, 'Newcomers',       'Best scores from new users');
 