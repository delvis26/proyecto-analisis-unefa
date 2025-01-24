"use client";

import { GetPayments } from "@/actions/get-payments";
import { GetStudentsRepresented } from "@/actions/get-students-represented";
import { RegisterPayment } from "@/actions/register-payment";
import {
  IconCashRegister,
  IconCircleCheckFilled,
  IconExclamationCircle,
  IconEye,
  IconSearch,
} from "@/components/icons";
import TextSkeleton from "@/components/skeleton";
import { ARRAY_BANKS, ARRAY_CONCEPTS } from "@/lib/consts";
import UserContext from "@/store/user-context";
import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface Student {
  id: string;
  fullName: string;
  gender: string;
  status: string;
  course: string;
  createdAt: string;
  representativeId: string;
}

interface Payments {
  id: string;
  createdAt: string;
  identification: string;
  phone: string;
  representativeId: string;
  bank: string;
  bankReference: string;
  amount: number;
  concept: string;
  studentId: string;
}

export default function Payments() {
  const [pending, setPending] = useState(true);
  const [dataPending, setDataPending] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [bankError, setBankError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorBankReference, setErrorBankReference] = useState(false);
  const [dataPayments, setDataPayments] = useState<Payments[]>([]);

  const session = useContext(UserContext);
  const userId = session.id as string;

  const dialogRef = useRef(null);

  useEffect(() => {
    setDataPending(true);

    const getDataStudent = async () => {
      const res = await GetStudentsRepresented(userId);
      const data = await GetPayments(userId);

      if (data) {
        setDataPayments(data);
        setDataPending(false);
      }

      if (res) {
        setStudents(res);
      }
    };

    getDataStudent();
  }, []);

  const handleStudentChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { currentTarget } = event;

      if (currentTarget.value !== null) {
        setSuccess(false);
        setPending(false);
      }
    },
    []
  );

  const handleBankChange = useCallback(() => {
    setBankError(false);
  }, []);

  const handleBankReferenceChange = useCallback(() => {
    setErrorBankReference(false);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const $form = event.currentTarget;
    const formData = new FormData($form);
    formData.append("userId", userId);

    const res = await RegisterPayment(formData);

    if (res.error === "Indique un banco") {
      setBankError(true);
      setPending(false);
      return;
    }

    if (res.error === "La referencia bancaria ya existe") {
      setErrorBankReference(true);
      setPending(false);
      return;
    }

    $form.reset();
    setSuccess(true);
  };

  return (
    <>
      <section className="bg-white rounded-xl p-4 border border-black/5 shadow-sm flex flex-col">
        <h1 className="text-center text-xl font-bold mb-4">MIS PAGOS</h1>
        <div className="flex flex-row justify-between gap-4 mb-4">
          <div>
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 ps-3 pointer-events-none flex items-center">
                  <IconSearch className="w-6 h-6 opacity-30 select-none" />
                </div>
                <input
                  onChange={() => console.log("Cambio...")}
                  required
                  name="search"
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                  type="text"
                  placeholder="Buscar..."
                />
              </div>
            </form>
          </div>

          <div>
            <button
              popoverTarget="confirm-payment"
              className="flex justify-center items-center px-3 py-2 gap-2 bg-blue-600 hover:bg-blue-800 transition-colors rounded-lg shadow text-white text-nowrap"
            >
              <IconCashRegister className="w-6 h-6" />
              Registrar pago
            </button>
          </div>
        </div>

        <div className="flex flex-col text-sm md:text-base">
          <div className="flex flex-row *:truncate *:flex-1 px-4 py-2 gap-2 bg-black/5 font-semibold rounded-lg">
            <div>Referencia</div>
            <div>Monto</div>
            <div className="flex justify-center">Fecha</div>
            <div className="flex justify-end">Acciones</div>
          </div>
          {dataPayments.length > 0 &&
            dataPayments.map((payment) => {
              const formatedDate = new Date(
                payment.createdAt
              ).toLocaleDateString("es-ve");

              return (
                <div
                  key={payment.id}
                  className="flex flex-row items-center *:truncate *:flex-1 px-4 py-2 gap-2"
                >
                  <div>{payment.bankReference}</div>
                  <div>{payment.amount} Bs</div>
                  <div className="flex justify-center">{formatedDate}</div>
                  <div className="flex justify-end">
                    <Link
                      className="p-1 md:px-2 bg-blue-600 hover:bg-blue-800 transition-colors text-white rounded-lg shadow flex justify-center items-center gap-1"
                      href={`payments/${payment.id}`}
                    >
                      <IconEye className="w-6 h-6" />
                      <span className="hidden md:block">Visualizar</span>
                    </Link>
                  </div>
                </div>
              );
            })}

          {dataPending === false && dataPayments.length === 0 && (
            <div className="flex py-2 justify-center items-center">
              Sin resultados
            </div>
          )}

          {dataPending && (
            <div className="my-2 flex flex-col gap-2 justify-center items-center">
              {Array.from({ length: 10 }, (_, index) => (
                <TextSkeleton key={index} h="40px" />
              ))}
            </div>
          )}
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="fixed top-0 left-0 w-full h-full open:flex content-center justify-items-center bg-transparent z-50"
        id="confirm-payment"
        popover="auto"
      >
        <div className="p-5 w-full max-w-2xl flex flex-col justify-center gap-4">
          <div className="flex flex-col gap-4 justify-center items-center p-3.5 rounded-lg shadow-2xl z-10 bg-white">
            <h3 className="font-bold text-center w-full">REGISTRAR PAGO</h3>

            <div className="bg-black/5 p-3 w-full shadow text-sm flex flex-col gap-2 border-l-4 border-blue-600">
              <h4 className="font-semibold">PAGO MOVIL</h4>
              <span>Número de telefono: 0400-000000</span>
              <span>RIF: J00000000</span>
              <span>Banco: Banco de Venezuela</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-4">
                <select
                  name="concept_amount"
                  defaultValue="null"
                  className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                >
                  <option value="null" disabled>
                    Seleccione un concepto de pago
                  </option>
                  {ARRAY_CONCEPTS.map(({ label, concept, amount }) => (
                    <option key={concept} value={`${concept} ${amount}`}>
                      {label + " (" + amount + " Bs" + ")"}
                    </option>
                  ))}
                </select>

                <select
                  onChange={handleStudentChange}
                  name="student"
                  defaultValue="null"
                  className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
                >
                  <option value="null" disabled>
                    Seleccione un estudiante
                  </option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <input
                name="phone"
                required
                disabled={pending}
                type="text"
                placeholder="Número de teléfono"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              />

              <input
                name="identification"
                required
                disabled={pending}
                type="text"
                placeholder="Cédula de identidad"
                className="w-full px-3 py-3 rounded-xl border border-black/20 transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none"
              />

              <div className="flex flex-col gap-1">
                <select
                  disabled={pending}
                  onChange={handleBankChange}
                  name="bank"
                  defaultValue="null"
                  className={`w-full px-3 py-3 rounded-xl border ${
                    bankError ? "border-red-500" : "border-black/20"
                  } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
                >
                  <option value="null" disabled>
                    Banco
                  </option>
                  {ARRAY_BANKS.map(({ name }) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                {bankError && (
                  <span className="text-sm text-red-600 font-semibold flex flex-row gap-1">
                    <IconExclamationCircle className="w-5 h-5" />
                    Indique un banco
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  onChange={handleBankReferenceChange}
                  maxLength={4}
                  name="bank_reference"
                  required
                  disabled={pending}
                  type="text"
                  placeholder="Referencia bancaria"
                  className={`w-full px-3 py-3 rounded-xl border ${
                    errorBankReference ? "border-red-500" : "border-black/20"
                  } transition-shadow ring-blue-500/20 focus:ring-[3px] outline-none`}
                />

                {errorBankReference && (
                  <span className="text-sm text-red-600 font-semibold flex flex-row gap-1">
                    <IconExclamationCircle className="w-5 h-5" />
                    La referencia bancaria ya existe
                  </span>
                )}
              </div>

              {success && (
                <div className="flex flex-row gap-1 items-center border-l-4 border-green-600 bg-green-200 p-2 text-green-900 font-semibold shadow">
                  <IconCircleCheckFilled className="w-5 h-5" />
                  El pago fue registrado con éxito
                </div>
              )}

              <button
                disabled={pending}
                className="p-3 disabled:pointer-events-none disabled:opacity-70 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors duration-150 uppercase"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>

        <button
          popoverTarget="confirm-payment"
          popoverTargetAction="hide"
          className="bg-black/40 w-full h-full fixed top-0 left-0 cursor-default -z-50"
        ></button>
      </dialog>
    </>
  );
}
