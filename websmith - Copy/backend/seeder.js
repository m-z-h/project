const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Client = require('./models/Client');
const Project = require('./models/Project');
const Task = require('./models/Task');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/websmith', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB connected for seeding...');
    
    // Clear existing data
    await User.deleteMany({});
    await Client.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@websmith.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });
    
    console.log('Created admin user: admin@websmith.com / admin123');
    
    // Create sample clients
    const clients = await Client.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        company: 'Tech Corp',
        address: '123 Main St',
        city: 'New York',
        country: 'USA',
        postalCode: '10001',
        isActive: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        company: 'Design Studio',
        address: '456 Oak Ave',
        city: 'Los Angeles',
        country: 'USA',
        postalCode: '90001',
        isActive: true,
      },
    ]);
    
    console.log('Created sample clients');
    
    // Create sample projects
    const projects = await Project.create([
      {
        name: 'E-commerce Website',
        description: 'Build a modern e-commerce platform with React and Node.js',
        status: 'in-progress',
        client: clients[0]._id,
        team: [adminUser._id],
        startDate: new Date(),
        budget: 15000,
        priority: 'high',
        createdBy: adminUser._id,
      },
      {
        name: 'Mobile App Design',
        description: 'Design UI/UX for iOS and Android mobile application',
        status: 'planning',
        client: clients[1]._id,
        team: [adminUser._id],
        startDate: new Date(),
        budget: 8000,
        priority: 'medium',
        createdBy: adminUser._id,
      },
    ]);
    
    console.log('Created sample projects');
    
    // Create sample tasks
    const tasks = await Task.create([
      {
        title: 'Setup project repository',
        description: 'Initialize Git repo and setup CI/CD pipeline',
        status: 'completed',
        priority: 'high',
        project: projects[0]._id,
        assignedTo: [adminUser._id],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        estimatedHours: 4,
        actualHours: 3,
        createdBy: adminUser._id,
      },
      {
        title: 'Design homepage mockup',
        description: 'Create high-fidelity mockups for the homepage',
        status: 'in-progress',
        priority: 'high',
        project: projects[0]._id,
        assignedTo: [adminUser._id],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        estimatedHours: 8,
        actualHours: 0,
        createdBy: adminUser._id,
      },
      {
        title: 'Client meeting',
        description: 'Discuss requirements and project scope',
        status: 'todo',
        priority: 'medium',
        project: projects[1]._id,
        assignedTo: [adminUser._id],
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        estimatedHours: 2,
        actualHours: 0,
        createdBy: adminUser._id,
      },
    ]);
    
    console.log('Created sample tasks');
    
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: 1`);
    console.log(`   - Clients: 2`);
    console.log(`   - Projects: 2`);
    console.log(`   - Tasks: 3`);
    console.log('\n🔐 Login credentials:');
    console.log('   Email: admin@websmith.com');
    console.log('   Password: admin123');
    console.log('\n🚀 You can now start the application with: npm run dev\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
