const { valid_error_object, translate_field_name} = require('../js/utils/excelUploadUtils.jsx');
const expect = require("chai").expect;

describe('Excel error functionality', function () {
  describe('.valid_error_object()', function () {
    it('Should return false if "row" key is not present', function () {
      const data = { 'error': {} };
      const value = valid_error_object(data);
      
      expect(value).to.be.false;
    });

    it('Should return false if "error" key is not present', function () {
      const data = { 'row': 1 };
      const value = valid_error_object(data);
      
      expect(value).to.be.false;
    });

    it('Should return true if "row" and "error" keys are present', function () {
      const data = { 'row': {}, 'error': {} };
      const value = valid_error_object(data);
      
      expect(value).to.be.true;
    });
  })

  describe('.translate_field_name()', function () {
    it('Should return Nombre for first_name', function () {
      const field = 'first_name';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Nombre');
    });

    it('Should return Apellido for last_name', function () {
      const field = 'last_name';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Apellido');
    });

    it('Should return Instrumento for instrument', function () {
      const field = 'instrument';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Instrumento');
    });
    it('Should return Género for gender', function () {
      const field = 'gender';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Género');
    });
    it('Should return Fecha de Naciemiento for birth_date', function () {
      const field = 'birth_date';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Fecha de nacimiento');
    });
    it('Should return Email for email', function () {
      const field = 'email';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Email');
    });
    it('Should return Teléfono for phone_number_mobile', function () {
      const field = 'phone_number_mobile';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Teléfono');
    });
    it('Should return Teléfono fijo for phone_number_home', function () {
      const field = 'phone_number_home';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Teléfono fijo');
    });
    it('Should return RUT for social_id', function () {
      const field = 'social_id';
      const value = translate_field_name(field);

      expect(value).to.be.equal('RUT');
    });
    it('Should return the same field name capitalized and without underscores if not recognized', function () {
      const field = 'error_excel_library_and_stuff';
      const value = translate_field_name(field);

      expect(value).to.be.equal('Error excel library and stuff');
    });
  });


});