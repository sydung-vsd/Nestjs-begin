import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { getDataResponse } from 'src/utils/getDataResponse';
import { GetPatientFilterDto } from './dto/get-patient-filter.dto';

@Injectable()
export class PatientService {
  // inject patient repository
  constructor (
    @InjectRepository(Patient) private readonly patientRepository: Repository<Patient>
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      if (!createPatientDto.firstName) {
        return getDataResponse("The firstName is required");
      }
  
      if (!createPatientDto.lastName) {
        return getDataResponse("The lastName is required");
      }
  
      if (!createPatientDto.age) {
        return getDataResponse("The age is required");
      }
  
      const patient: Patient =  new Patient();
      patient.firstName = createPatientDto.firstName;
      patient.lastName = createPatientDto.lastName;
      patient.middleName = createPatientDto.middleName;
      patient.age = createPatientDto.age;
  
      const dataPatientPost = await this.patientRepository.save(patient);
      console.log('[Create-Patient] [SUCCESS]', dataPatientPost);
      
      return getDataResponse("Success", 200, dataPatientPost);
    } catch (error) {
      console.log(error);
      throw error;
    }    
  }

  async findAll(filterDto: GetPatientFilterDto) {
    try {
      const { status, search } = filterDto;
      const data = await this.patientRepository.find();
      console.log("[findAll ~ data]:", data);

      return getDataResponse("Success", 200, data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: any) {
    try {
      console.log("ID:::", id);
      const dataPatientId = await this.patientRepository.findOne({where: {id: id}});
      if (!dataPatientId) {
        return getDataResponse("The Patient does not exist!")
        // throw new NotFoundException("The Patient does not exist!");  // Dùng NotFoundException của nestjs/common để throw error, chuỗi truyền vào sẽ là message bắn ra
      }

      return getDataResponse("Success", 200, dataPatientId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      if (!updatePatientDto.firstName) {
        return getDataResponse("The firstName is required");
      }
  
      if (!updatePatientDto.lastName) {
        return getDataResponse("The lastName is required");
      }
  
      if (!updatePatientDto.age) {
        return getDataResponse("The age is required");
      }

      const patient: Patient = new Patient();
      patient.firstName = updatePatientDto.firstName;
      patient.lastName = updatePatientDto.lastName;
      patient.middleName = updatePatientDto.middleName || "";
      patient.age = updatePatientDto.age;
      patient.id = updatePatientDto.id;

      const dataUpdate = this.patientRepository.save(patient);
      console.log("[Update Success]");
      
      return getDataResponse("Success", 200, dataUpdate);
    } catch (error) {
      console.log("[ERROR]:::", error);
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
