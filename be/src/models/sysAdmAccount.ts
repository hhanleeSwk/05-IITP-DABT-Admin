import { DataTypes, Model, Optional } from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface SysAdmAccountAttributes {
  admId?: number;
  loginId: string;
  password: string;
  name: string;
  roles: string;
  status: string;
  delYn: string;
  latestLoginAt?: Date;
  affiliation?: string;
  description?: string;
  note?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  deletedBy?: string;
}

export interface SysAdmAccountCreationAttributes extends Optional<SysAdmAccountAttributes, 'admId' | 'latestLoginAt' | 'affiliation' | 'description' | 'note' | 'updatedAt' | 'deletedAt' | 'updatedBy' | 'deletedBy' | 'createdAt'> {}

export class SysAdmAccount extends Model<SysAdmAccountAttributes, SysAdmAccountCreationAttributes> implements SysAdmAccountAttributes {
  public admId!: number;
  public loginId!: string;
  public password!: string;
  public name!: string;
  public roles!: string;
  public status!: string;
  public delYn!: string;
  public latestLoginAt?: Date;
  public affiliation?: string;
  public description?: string;
  public note?: string;
  public createdAt!: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
  public createdBy!: string;
  public updatedBy?: string;
  public deletedBy?: string;
}

export function initSysAdmAccount(sequelize: Sequelize) {
  SysAdmAccount.init(
    {
      admId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'adm_id',
        comment: 'system id, 고유 식별자 (자동 증가)',
      },
      loginId: {
        type: DataTypes.STRING(128),
        allowNull: false,
        field: 'login_id',
        comment: 'admin login id',
        unique: true,
      },
      password: {
        type: DataTypes.CHAR(60),
        allowNull: false,
        comment: 'admin login password (bcrypt Hashing)',
      },
      name: {
        type: DataTypes.STRING(90),
        allowNull: false,
        comment: 'admin name',
      },
      roles: {
        type: DataTypes.STRING(8),
        allowNull: false,
        comment: 'admin role, "sys_admin_roles" comm code 참조',
      },
      status: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 'A',
        comment: '데이터 상태, "data_status" comm code 참조',
      },
      delYn: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 'N',
        field: 'del_yn',
        comment: '삭제여부 (Y: 삭제)',
      },
      latestLoginAt: {
        type: DataTypes.DATE,
        field: 'latest_login_at',
        comment: 'latest login time',
      },
      affiliation: {
        type: DataTypes.STRING(60),
        comment: 'admin 소속',
      },
      description: {
        type: DataTypes.STRING(600),
        comment: 'admin 설명',
      },
      note: {
        type: DataTypes.STRING(600),
        comment: '비고',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
        comment: '레코드 생성 시각',
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'updated_at',
        comment: '레코드 수정 시각',
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
        comment: '삭제 일시 (논리 삭제 시 기록)',
      },
      createdBy: {
        type: DataTypes.STRING(40),
        allowNull: false,
        field: 'created_by',
        comment: '데이터 생성자 (SYS-BACH, SYS-MANUAL, BY-USER, admin name), "sys_work_type" comm code 참조',
      },
      updatedBy: {
        type: DataTypes.STRING(40),
        field: 'updated_by',
        comment: '데이터 수정자',
      },
      deletedBy: {
        type: DataTypes.STRING(40),
        field: 'deleted_by',
        comment: '데이터 삭제자',
      },
    },
    {
      sequelize,
      tableName: 'sys_adm_account',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true, // 논리 삭제 사용
      indexes: [
        {
          unique: true,
          fields: ['login_id'],
          name: 'uidx_sys_adm_account_login',
        },
        {
          fields: ['name'],
          name: 'idx_sys_adm_account_name',
        },
        {
          fields: ['roles', 'status'],
          name: 'idx_sys_adm_account_role_status',
        },
      ],
    }
  );
} 