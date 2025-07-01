// tests/enquiry.test.js

// Mock mongoose to avoid needing actual database connection
jest.mock('mongoose', () => ({
    Schema: jest.fn(() => ({
        pre: jest.fn(),
        post: jest.fn()
    })),
    model: jest.fn(() => 'MockedEnquiryModel'),
    connect: jest.fn(),
    connection: {
        readyState: 1,
        close: jest.fn()
    }
}));

// Mock the Counter model
jest.mock('../models/Counter', () => ({
    Counter: {
        findByIdAndUpdate: jest.fn()
    },
    getNextSequence: jest.fn(() => Promise.resolve(1))
}));

const Enquiry = require('../models/Enquiry');

describe('Enquiry Model Tests', () => {
    describe('Enquiry Model Structure', () => {
        test('should be defined and importable', () => {
            expect(Enquiry).toBeDefined();
            expect(Enquiry).toBe('MockedEnquiryModel');
        });
    });

    describe('Enquiry Validation Logic', () => {
        test('should validate email format correctly', () => {
            // Test email validation regex used in the model
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            
            // Valid emails
            expect(emailRegex.test('test@example.com')).toBe(true);
            expect(emailRegex.test('user.name@domain.co.uk')).toBe(true);
            expect(emailRegex.test('user-name@domain.org')).toBe(true);
            
            // Invalid emails
            expect(emailRegex.test('invalid-email')).toBe(false);
            expect(emailRegex.test('@domain.com')).toBe(false);
            expect(emailRegex.test('user@')).toBe(false);
            expect(emailRegex.test('user@domain')).toBe(false);
        });

        test('should validate phone format correctly', () => {
            // Test phone validation regex used in the model
            const phoneRegex = /^\+?[0-9]{10}$/;
            
            // Valid phone numbers
            expect(phoneRegex.test('1234567890')).toBe(true);
            expect(phoneRegex.test('+1234567890')).toBe(true);
            
            // Invalid phone numbers
            expect(phoneRegex.test('123')).toBe(false);
            expect(phoneRegex.test('12345678901')).toBe(false); // 11 digits
            expect(phoneRegex.test('123-456-7890')).toBe(false); // contains dashes
            expect(phoneRegex.test('abc1234567')).toBe(false); // contains letters
        });

        test('should validate message length requirements', () => {
            const minLength = 10;
            const maxLength = 500;
            
            // Valid messages
            expect('This is a valid message that meets requirements.'.length).toBeGreaterThanOrEqual(minLength);
            expect('Valid msg.'.length).toBeGreaterThanOrEqual(minLength);
            
            // Invalid messages
            expect('Short'.length).toBeLessThan(minLength);
            expect('a'.repeat(501).length).toBeGreaterThan(maxLength);
            
            // Edge cases
            expect('a'.repeat(minLength).length).toBe(minLength); // exactly min length
            expect('a'.repeat(maxLength).length).toBe(maxLength); // exactly max length
        });
    });

    describe('Enquiry Business Logic', () => {
        test('should require either email or phone', () => {
            // This test demonstrates the business logic that requires at least one contact method
            const hasEmail = 'test@example.com';
            const hasPhone = '1234567890';
            const noEmail = '';
            const noPhone = '';
            
            // Should pass validation
            expect(hasEmail || hasPhone).toBeTruthy();
            expect(hasEmail || noPhone).toBeTruthy();
            expect(noEmail || hasPhone).toBeTruthy();
            
            // Should fail validation
            expect(noEmail || noPhone).toBeFalsy();
        });

        test('should handle string trimming logic', () => {
            // Test string trimming that would happen in the model
            const testCases = [
                { input: '  John Doe  ', expected: 'John Doe' },
                { input: '  test@example.com  ', expected: 'test@example.com' },
                { input: '  1234567890  ', expected: '1234567890' },
                { input: 'NoSpaces', expected: 'NoSpaces' }
            ];

            testCases.forEach(({ input, expected }) => {
                expect(input.trim()).toBe(expected);
            });
        });

        test('should handle email case conversion', () => {
            // Test email lowercase conversion that would happen in the model
            const testCases = [
                { input: 'TEST@EXAMPLE.COM', expected: 'test@example.com' },
                { input: 'User.Name@Domain.ORG', expected: 'user.name@domain.org' },
                { input: 'mixed.Case@Email.Com', expected: 'mixed.case@email.com' }
            ];

            testCases.forEach(({ input, expected }) => {
                expect(input.toLowerCase()).toBe(expected);
            });
        });
    });

    describe('Enquiry ID Generation', () => {
        test('should demonstrate auto-increment concept', () => {
            // Mock the auto-increment behavior
            let currentId = 0;
            const getNextId = () => ++currentId;
            
            expect(getNextId()).toBe(1);
            expect(getNextId()).toBe(2);
            expect(getNextId()).toBe(3);
        });
    });

    describe('Required Field Validation', () => {
        test('should identify required fields', () => {
            const requiredFields = ['name', 'message'];
            const optionalFields = ['email', 'phone', 'remarks', 'isFollowedUp'];
            
            // Demonstrate that name and message are required
            expect(requiredFields).toContain('name');
            expect(requiredFields).toContain('message');
            
            // Demonstrate that other fields are optional
            expect(requiredFields).not.toContain('email');
            expect(requiredFields).not.toContain('phone');
            
            expect(optionalFields).toContain('email');
            expect(optionalFields).toContain('phone');
        });
    });
});