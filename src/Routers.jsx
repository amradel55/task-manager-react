import { Route, Routes } from "react-router-dom"
import Configuration from './pages/Configuration/Configuration';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import PipelineList from "./pages/Pipeline/PipelineList";
import PiplineSingle from "./pages/Pipeline/PipelineSingle";




const Routers = () =>{
    return (
        <Routes>
        <Route path="/" element={
          
          <ProtectedRoute  >

            <PipelineList />

          </ProtectedRoute>

        } />
      <Route path="/single-pipeline/:pipeline_id" element={
          
          <ProtectedRoute  >

            <PiplineSingle />

          </ProtectedRoute>

        } />
        <Route  path="/login" element={ <Login /> } />
        <Route path="/configuration" element={
          
          <ProtectedRoute  >

            <Configuration />

          </ProtectedRoute>

        } />

      

   </Routes>
    )
}

export default Routers;